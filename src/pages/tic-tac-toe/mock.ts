export const rooms: RoomType[] = [
  {
    id: "101",
    name: "Dragon's Den",
    creator: {
      id: "501",
      name: "Arthur the Brave",
    },
    status: "aguardando",
    players: [
      {
        id: "501",
        name: "Arthur the Brave",
      },
      {
        id: "502",
        name: "Lancelot the Swift",
      },
    ],
    spectators: [],
  },
  {
    id: "102",
    name: "Mystic Forest",
    creator: {
      id: "502",
      name: "Lancelot the Swift",
    },
    status: "aguardando",
    players: [
      {
        id: "501",
        name: "Arthur the Brave",
      },
      {
        id: "502",
        name: "Lancelot the Swift",
      },
    ],
    spectators: [],
  },
  {
    id: "103",
    name: "Castle Siege",
    creator: {
      id: "503",
      name: "Guinevere the Wise",
    },
    status: "jogando",
    players: [
      {
        id: "501",
        name: "Arthur the Brave",
      },
      {
        id: "502",
        name: "Lancelot the Swift",
      },
    ],
    spectators: [
      {
        id: "503",
        name: "Guinevere the Wise",
      },
    ],
  },
];

export type RoomType = {
  id: string;
  name: string;
  creator: {
    id: string;
    name: string;
  };
  status: "aguardando" | "jogando" | "finalizado";
  players: {
    id: string;
    name: string;
  }[];
  spectators: {
    id: string;
    name: string;
  }[];
};
