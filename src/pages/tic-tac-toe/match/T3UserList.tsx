import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { stringToColor } from "../../../service/utils";

const UserEntry = ({ name }: { name: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "6px",
        borderRadius: "8px",
        gap: "6px",
        alignItems: "center",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 24,
          height: 24,
          fontSize: "16px",
          backgroundColor: stringToColor(name),
        }}
      >
        {name[0]}
      </Avatar>
      <Typography fontWeight={500} color={stringToColor(name)}>
        {name}
      </Typography>
    </Box>
  );
};

const T3UserBoard = () => {
  return (
    <Box
      sx={{
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginX: "6px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            alignContent: "center",
            fontSize: {
              xs: "12px",
              sm: "16px",
            },
          }}
        >
          Jogadores:
        </Typography>
        <Button
          size="small"
          variant="contained"
          sx={{
            padding: "4px 2px",
            fontSize: "12px",
            lineHeight: "12px",
          }}
        >
          Entrar
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <UserEntry name="Canobrian" />
        <UserEntry name="Wildscream" />
      </Box>
      <Divider
        sx={{
          margin: "8px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginX: "6px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            alignContent: "center",
            fontSize: {
              xs: "12px",
              sm: "16px",
            },
          }}
        >
          Espectadores:
        </Typography>
        <Button
          size="small"
          variant="contained"
          disabled
          sx={{
            padding: "4px 2px",
            fontSize: "12px",
            lineHeight: "12px",
          }}
        >
          Entrar
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {["Alice", "Bob", "Charlie", "Diana", "Eve"].map((name, index) => (
          <UserEntry key={index} name={name} />
        ))}
      </Box>
    </Box>
  );
};

export default T3UserBoard;
