import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateRoomDialog from "./dialog/CreateRoomDialog";
import { rooms } from "./mock";
import NerdboardContainer from "../../components/NerdboardContainer";
import NerdboardHeader from "../../components/NerdboardHeader";
import T3RoomCard from "./T3RoomCard";

const roomData = rooms;

function T3Hub() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { t } = useTranslation();

  async function onCreate(name: string) {
    console.log(name);
    return Promise.resolve();
  }

  return (
    <>
      <NerdboardContainer>
        <NerdboardHeader
          title={t("t3Hub.header.title")}
          subtitle={t("t3Hub.header.subtitle")}
          buttonTitle={t("t3Hub.header.buttonTitle")}
          buttonOnClick={() => setCreateDialogOpen(true)}
        />

        {roomData.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {rooms.map((room) => (
              <T3RoomCard key={room.id} room={room} />
            ))}
          </Box>
        ) : (
          <Paper
            sx={{
              padding: "32px",
            }}
          >
            <Typography variant="h2" textAlign="center">
              {t("t3Hub.noRoomsMessage")}
            </Typography>
          </Paper>
        )}
      </NerdboardContainer>
      <CreateRoomDialog
        onClose={() => setCreateDialogOpen(false)}
        onCreate={onCreate}
        open={createDialogOpen}
      />
    </>
  );
}

export default T3Hub;
