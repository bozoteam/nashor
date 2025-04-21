import {
  CreateChatRoomResponse,
  FetchChatRoomsResponse,
} from "../../types/chat";
import { api } from "../kyClient";

export const fetchChatRooms = async () => {
  const res = await api.get("api/v1/chat/rooms").json<FetchChatRoomsResponse>();
  return res.rooms;
};

export const createChatRoom = async (roomName: string) => {
  const res = await api.post("api/v1/chat/rooms", {
    json: { name: roomName },
  });
  return res.json<CreateChatRoomResponse>();
};

export const sendMessage = async (room_id: string, content: string) => {
  const res = await api.post(`api/v1/chat/rooms/message`, {
    json: { content, room_id },
  });
  return res.json();
};
