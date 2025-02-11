import { ChatRoom } from "../../store/useChatStore";
import axiosInstance from "../axios";

export async function apiGetChatRooms() {
  return axiosInstance.get("/chat/rooms");
}

export async function apiCreateChatRoom(roomName: string) {
  return axiosInstance.post<ChatRoom>("/chat/rooms", {
    name: roomName,
    id: Math.floor(Math.random() * 10000).toString(),
  });
}
