import { Box, Typography } from "@mui/material";
import "./board.css";

const Token = ({ token }: { token: "X" | "O" | undefined }) => {
  return (
    <Box
      className="item"
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        color="primary.dark"
        sx={{
          fontFamily: "cursive",
          fontSize: "4.5rem",
          fontWeight: 700,
          width: "100%",
          height: "100%",
          textAlign: "center",
          ":hover": {
            backgroundColor: "#F0F3F0",
            borderRadius: "8px",
          },
        }}
      >
        {token}
      </Typography>
    </Box>
  );
};

const T3Board = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        className="t3board"
        sx={{
          backgroundColor: "primary.dark",
        }}
      >
        <Token token="X" />
        <Token token="O" />
        <Token token="X" />
        <Token token={undefined} />
        <Token token="O" />
        <Token token={undefined} />
        <Token token={undefined} />
        <Token token={undefined} />
        <Token token={undefined} />
      </Box>
    </Box>
  );
};

export default T3Board;
