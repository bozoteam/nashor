import { User } from "./user";

export type ChatRoom = {
  id: string;
  creatorId: string;
  name: string;
  users: User[];
};

export type FetchChatRoomsResponse = {
  rooms: ChatRoom[];
};

export type CreateChatRoomResponse = { room: ChatRoom };

export type Message = {
  content: string;
  room_id: string;
  timestamp: number;
  user: User;
};
