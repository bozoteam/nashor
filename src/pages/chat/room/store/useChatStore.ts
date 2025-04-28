import { create } from "zustand";
import { User } from "../../../../types/user";
import {
  GroupedMessages,
  Message,
  UserJoinLeaveEvent,
} from "../../../../types/chat";
import { baseUrl } from "../../../../service/kyClient";

interface ChatStore {
  socket: WebSocket | null;
  messages: (GroupedMessages | UserJoinLeaveEvent)[];
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

    const attemptConnection = (retryCount = 0) => {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.info("WebSocket connected");
        didConnect = true;
        set({ isConnected: true, connectionError: false, socket });
      };

      socket.onmessage = (event) => {
        try {
          if (event.data === "PING") {
            console.debug("Received PING from server, sending PONG");
            get().sendPong();
            return;
          }
          const data = JSON.parse(event.data);
          console.debug("Parsed data:", data);

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
        console.warn("WebSocket disconnected");
        set({ isConnected: false, socket: null });
        if (!didConnect && retryCount < 3) {
          console.info(`Retrying connection... Attempt ${retryCount + 1}`);
          setTimeout(() => attemptConnection(retryCount + 1), 2000);
        }
      };

      socket.onerror = (err) => {
        if (!didConnect) {
          set({ connectionError: true });
          console.error("WebSocket error:", err);
        }
      };
    };

    attemptConnection();
  },

  disconnect: () => {
    get().socket?.close();
    set({ isConnected: false, socket: null });
  },

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

  addMessage: (msg: Message) => {
    const { messages } = get();
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      !("type" in lastMessage) &&
      "user" in lastMessage &&
      lastMessage.user.id === msg.user.id
    ) {
      // check if last message is from the same user
      lastMessage.messages.push({
        content: msg.content,
        timestamp: msg.timestamp,
      });
    } else {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            room_id: msg.room_id,
            user: msg.user,
            timestamp: msg.timestamp,
            messages: [
              {
                content: msg.content,
                timestamp: msg.timestamp,
              },
            ],
          },
        ],
      }));
    }
    // set((state) => ({ messages: [...state.messages, msg] }))
  },

  setUsers: (users: User[]) => {
    const oldUsers = get().users;
    const newUsers = users.filter(
      (newUser) => !oldUsers.some((oldUser) => oldUser.id === newUser.id)
    );
    if (newUsers.length === 1) {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            type: "user_join",
            user: newUsers[0],
          },
        ],
      }));
    }
    const leftUsers = oldUsers.filter(
      (oldUser) => !users.some((newUser) => newUser.id === oldUser.id)
    );
    if (leftUsers.length === 1) {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            type: "user_leave",
            user: leftUsers[0],
          },
        ],
      }));
    }
    set({ users });
  },
}));
