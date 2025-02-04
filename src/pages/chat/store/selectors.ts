import { ChatState } from ".";

export const selectChatRooms = (state: { chat: ChatState }) =>
  state.chat.chatRooms;
