import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { RoomType } from "./mock";
import { Box, Button, Chip, Paper, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function T3RoomCard({ room }: { room: RoomType }) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/tic-tac-toe/${room.id}`}
      style={{ textDecoration: "none" }}
      aria-label={t("t3RoomCard.ariaLabel", {
        name: room.name,
        status: t(`t3RoomCard.status.${room.status}`),
      })}
    >
      <Paper
        sx={{
          padding: "16px 20px",
          display: "flex",
          cursor: "pointer",
          justifyContent: "space-between",
          ":hover": {
            boxShadow: 2,
            backgroundColor: "#F0F3F0",
          },
          ":focus-visible": {
            outline: "2px solid #3BA57C",
            outlineOffset: "2px",
          },
        }}
        tabIndex={0}
        role="article"
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: { xs: "4px", sm: "8px" },
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              marginBottom: "4px",
            }}
          >
            <Typography variant="h2" fontWeight={500} marginBottom={"4px"}>
              {room.name}
            </Typography>
            <Chip
              label={t(`t3RoomCard.status.${room.status}`)}
              size="small"
              color={room.status === "aguardando" ? "warning" : "success"}
              variant="outlined"
              icon={
                room.status === "aguardando" ? (
                  <HourglassBottomIcon aria-hidden="true" />
                ) : (
                  <SportsEsportsIcon aria-hidden="true" />
                )
              }
            />
          </Box>
          <Typography variant="body1">
            {t("t3RoomCard.createdBy", { name: room.creator.name })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: {
              xs: "8px",
              sm: "16px",
            },
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "row",
                sm: "column",
              },
              justifyContent: "center",
              gap: {
                xs: "8px",
                sm: "0",
              },
            }}
          >
            <Tooltip
              title={t("t3RoomCard.playersTooltip")}
              arrow
              placement="top"
            >
              <Box
                sx={{ display: "flex", gap: "4px", alignItems: "center" }}
                aria-label={t("t3RoomCard.playersCount", {
                  count: room.players.length,
                })}
              >
                <GroupIcon fontSize="small" color="action" aria-hidden="true" />
                <Typography variant="body1">{room.players.length}</Typography>
              </Box>
            </Tooltip>
            <Tooltip title={t("t3RoomCard.spectatorsTooltip")} arrow>
              <Box
                sx={{ display: "flex", gap: "4px", alignItems: "center" }}
                aria-label={t("t3RoomCard.spectatorsCount", {
                  count: room.spectators.length,
                })}
              >
                <VisibilityIcon
                  fontSize="small"
                  color="action"
                  aria-hidden="true"
                />
                <Typography variant="body1">
                  {room.spectators.length}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
          <Box alignItems={"center"} display="flex">
            <Button
              variant="contained"
              aria-label={t("t3RoomCard.joinButtonAriaLabel", {
                name: room.name,
              })}
            >
              {t("t3RoomCard.joinButton")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
}

export default T3RoomCard;
