import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useChatStore from "../../store/useChatStore";

function ChatRoomsTable() {
  const { chatRooms } = useChatStore();
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Room name</TableCell>
            <TableCell>Members</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chatRooms.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No rooms found
              </TableCell>
            </TableRow>
          )}
          {chatRooms.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.03)",
                },
              }}
              onClick={() => {
                navigate("/chat/" + row.id);
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.users.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ChatRoomsTable;
