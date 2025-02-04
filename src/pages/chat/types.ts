export type ChatMessage = {
  message: string;
  createdAt: string;
  user: ChatUser;
};

export type ChatUser = {
  userId: string;
  username: string;
};
