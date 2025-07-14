import { Room } from "@proto/common/common";
import { User } from "./user";

export type ChatRoom = Room;

export type GroupedMessages = {
  room_id: string;
  user: User;
  timestamp: number;
  messages: {
    content: string;
    timestamp: number;
  }[];
};

export type Message = {
  content: string;
  room_id: string;
  timestamp: number;
  user: User;
};

export type UserJoinLeaveEvent = {
  type: "user_join" | "user_leave";
  user: User;
};
