import { Box, Typography } from "@mui/material";
import "./board.css";

interface TokenProps {
  token: "X" | "O" | undefined;
  position?: number;
  onClick?: () => void;
}

const Token = ({ token, position, onClick }: TokenProps) => {
  const cellPosition = position !== undefined ? position + 1 : undefined;
  const rowNum = cellPosition
    ? Math.floor((cellPosition - 1) / 3) + 1
    : undefined;
  const colNum = cellPosition ? ((cellPosition - 1) % 3) + 1 : undefined;
  const ariaLabel = token
    ? `Cell ${cellPosition}, row ${rowNum}, column ${colNum}, contains ${token}`
    : `Cell ${cellPosition}, row ${rowNum}, column ${colNum}, empty`;

  return (
    <Box
      className="item"
      sx={{
        backgroundColor: "background.paper",
        "&:focus-visible": {
          outline: "3px solid #3BA57C",
          outlineOffset: "-3px",
          borderRadius: "8px",
        },
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
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
        aria-hidden="true"
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
        role="grid"
        aria-label="Tic Tac Toe board"
      >
        <Token token="X" position={0} />
        <Token token="O" position={1} />
        <Token token="X" position={2} />
        <Token token={undefined} position={3} />
        <Token token="O" position={4} />
        <Token token={undefined} position={5} />
        <Token token={undefined} position={6} />
        <Token token={undefined} position={7} />
        <Token token={undefined} position={8} />
      </Box>
    </Box>
  );
};

export default T3Board;
