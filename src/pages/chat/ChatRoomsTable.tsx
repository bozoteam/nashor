import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../service/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchChatRooms } from "../../service/endpoints/chat";
import { useTranslation } from "react-i18next";

function ChatRoomsTable() {
  const { unauthenticated, authLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: chatRooms,
    isLoading,
    isStale,
  } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: fetchChatRooms,
    refetchInterval: 2000,
    staleTime: 3000,
  });

  const loading = authLoading || isLoading || isStale;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
          <TableRow>
            <TableCell>{t("chatRoomsTable.headers.id")}</TableCell>
            <TableCell>{t("chatRoomsTable.headers.name")}</TableCell>
            <TableCell>{t("chatRoomsTable.headers.members")}</TableCell>
            <TableCell>{t("chatRoomsTable.headers.createdBy")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unauthenticated && (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                data-testid="unauthenticated-message"
              >
                {t("chatRoomsTable.messages.unauthenticated")}
              </TableCell>
            </TableRow>
          )}
          {!unauthenticated && loading && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {chatRooms?.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                data-testid="no-rooms-message"
              >
                {t("chatRoomsTable.messages.noRooms")}
              </TableCell>
            </TableRow>
          )}
          {!isStale &&
            chatRooms?.map((row) => (
              <TableRow
                key={row.id}
                data-testid={`room-${row.name}`}
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
                  {Object.keys(row.users).length}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.creator_id}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ChatRoomsTable;
