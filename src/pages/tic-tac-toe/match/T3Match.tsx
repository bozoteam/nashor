import { Typography } from "@mui/material";
import NerdboardGameContainer from "../../../components/NerdboardGameContainer";
import "./board.css";
import T3Board from "./T3Board";
import T3UserBoard from "./T3UserList";
import T3Chat from "./T3Chat";

const T3Match = () => {
  return (
    <NerdboardGameContainer
      userDisplay={<T3UserBoard />}
      chatDisplay={<T3Chat />}
    >
      <Typography
        variant="h3"
        color="text.primary"
        sx={{
          marginTop: "16px",
          fontWeight: 600,
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        Mystic Forest (Example title)
      </Typography>
      <T3Board />
      <Typography
        variant="h4"
        color="text.primary"
        sx={{
          fontWeight: 600,
          fontSize: "20px",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Vez de jogar: <strong>Jogador 1</strong> (X)
      </Typography>
    </NerdboardGameContainer>
  );
};

export default T3Match;
