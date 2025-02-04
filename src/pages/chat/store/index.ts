import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../service/axios";

interface ChatRoom {
  id: string;
  name: string;
  users: {
    id: string;
    username: string;
  }[];
}

interface Message {
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
}

export const fetchChatRooms = createAsyncThunk(
  "chat/fetchChatRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chat/rooms");
      console.log("response", response);
      if (!response.data) return [];

      return response.data.map((room: any) => ({
        // remover depois que bigode mudar
        id: room.id,
        name: `sala-${room.id}`,
        users: Object.values(room.users),
      }));
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: ChatState = {
  chatRooms: [],
  loading: false,
  error: null,
  activeRoom: undefined,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatrooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.chatRooms = action.payload;
    },
    setMessages: (
      state,
      action: PayloadAction<{ roomId: string; messages: Message[] }>
    ) => {
      if (!state.activeRoom) return;
      state.activeRoom = {
        ...state.activeRoom,
        id: action.payload.roomId,
        messages: action.payload.messages,
      };
    },
    addMessage: (
      state,
      action: PayloadAction<{ roomId: string; message: Message }>
    ) => {
      if (!state.activeRoom || state.activeRoom.id !== action.payload.roomId)
        return;
      state.activeRoom.messages.push(action.payload.message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.chatRooms = action.payload;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setChatrooms, setMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
