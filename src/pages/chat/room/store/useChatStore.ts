import { create } from "zustand";
import { User } from "../../../../types/user";
import { Message } from "../../../../types/chat";
import { baseUrl } from "../../../../service/kyClient";

interface ChatStore {
  socket: WebSocket | null;
  messages: Message[];
  users: User[];
  isConnected: boolean;
  connectionError: boolean;

  connect: (roomId: string) => void;
  disconnect: () => void;
  // sendMessage: (content: string) => void;
  sendPing: () => void;
  sendPong: () => void;

  addMessage: (msg: Message) => void;
  setUsers: (users: User[]) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  socket: null,
  messages: [],
  users: [],
  isConnected: false,
  connectionError: false,

  connect: (roomId: string) => {
    set({ messages: [], users: [], isConnected: false });
    const token = localStorage.getItem("access_token") || "";
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://${baseUrl}/api/v1/chat/rooms/${roomId}/ws?token=${encodeURIComponent(
      token
    )}`;
    let didConnect = false;

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
      didConnect = true;
      set({ isConnected: true });
    };

    socket.onmessage = (event) => {
      console.log(event);
      try {
        if (event.data === "PING") {
          console.log("Received PING from server, sending PONG");
          get().sendPong();
          return;
        }
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);

        if (data.users) {
          get().setUsers(data.users);
        } else if (data.content && data.user) {
          get().addMessage(data);
        }
      } catch (err) {
        console.warn("Non-JSON message:", event.data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      set({ isConnected: false });
    };

    socket.onerror = (err) => {
      if (!didConnect) {
        set({ connectionError: true });
        alert("Conexão com a sala falhou. Verifique se a sala existe.");
      }
      console.error("WebSocket error:", err);
    };

    set({ socket });
  },

  disconnect: () => {
    get().socket?.close();
    set({ isConnected: false, socket: null });
  },

  // sendMessage: (content: string) => {
  //   const { socket } = get();
  //   if (socket?.readyState === WebSocket.OPEN) {
  //     socket.send(JSON.stringify({ type: "message", content }));
  //   }
  // },

  sendPing: () => {
    const { socket } = get();
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "ping" }));
    }
  },

  sendPong: () => {
    const { socket } = get();
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send("PONG");
    }
  },

  addMessage: (msg: Message) =>
    set((state) => ({ messages: [...state.messages, msg] })),

  setUsers: (users: User[]) => set({ users }),
}));
