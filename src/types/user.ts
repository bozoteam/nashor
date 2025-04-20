export interface User {
  id: number;
  name: string;
  username: string;
}

export interface EndpointUserResponse {
  user: User;
}
