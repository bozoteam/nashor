import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { apiGetChatRooms, apiCreateChatRoom } from "../service/endpoints/chat";

// Define types
export interface ChatRoom {
  id: string;
  name: string;
  users: {
    id: string;
    username: string;
  }[];
}

export interface Message {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

export interface ChatState {
  chatRooms: ChatRoom[];
  loading: boolean;
  error: any;
  activeRoom?: {
    id: string;
    name: string;
    messages: Message[];
  };
  fetchChatRooms: () => Promise<void>;
  createChatRoom: (roomName: string) => Promise<ChatRoom | undefined>;
  setChatrooms: (chatRooms: ChatRoom[]) => void;
  setMessages: (roomId: string, messages: Message[]) => void;
  addMessage: (roomId: string, message: Message) => void;
}

// Create Zustand store with async API calls
const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        chatRooms: [],
        loading: false,
        error: null,
        activeRoom: undefined,

        // Fetch chat rooms from API
        fetchChatRooms: async () => {
          set({ loading: true, error: null });
          try {
            const response = await apiGetChatRooms();
            if (!response.data) return;
            const rooms = response.data.map((room: any) => ({
              id: room.id,
              name: `sala-${room.id}`, // Temporary naming
              users: Object.values(room.users),
            }));
            set({ chatRooms: rooms, loading: false });
          } catch (error: any) {
            set({
              error: error.response?.data || error.message,
              loading: false,
            });
          }
        },

        // Create a new chat room and refresh the list
        createChatRoom: async (roomName: string) => {
          try {
            const response = await apiCreateChatRoom(roomName);
            if (!response.data) return;
            await get().fetchChatRooms(); // Re-fetch chat rooms after creating one
            return response.data;
          } catch (error: any) {
            set({ error: error.response?.data || error.message });
          }
        },

        // Manually update chat rooms
        setChatrooms: (chatRooms) => set({ chatRooms }),

        // Set messages for a specific chat room
        setMessages: (roomId, messages) => {
          const activeRoom = get().activeRoom;
          if (!activeRoom) return;
          set({ activeRoom: { ...activeRoom, id: roomId, messages } });
        },

        // Add a new message to the active room
        addMessage: (roomId, message) => {
          const activeRoom = get().activeRoom;
          if (!activeRoom || activeRoom.id !== roomId) return;
          set({
            activeRoom: {
              ...activeRoom,
              messages: [...activeRoom.messages, message],
            },
          });
        },
      }),
      { name: "chat-storage" } // Persist chat state in localStorage
    )
  )
);

export default useChatStore;
