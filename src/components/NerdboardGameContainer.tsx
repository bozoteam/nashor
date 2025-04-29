import { Box, Paper } from "@mui/material";

import { ReactNode } from "react";

const NerdboardGameContainer = ({
  children,
  userDisplay,
  chatDisplay,
}: {
  children: ReactNode;
  userDisplay?: ReactNode;
  chatDisplay?: ReactNode;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          margin: { xs: "24px", sm: "32px" },
          gap: { xs: "16px", sm: "24px" },
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "80%" },
            height: { xs: "500px", sm: "100%" },
          }}
        >
          <Paper
            sx={{
              minHeight: "100%",
              padding: {
                xs: "16px",
                sm: "24px",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {children}
          </Paper>
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "30%",
            },
            display: "flex",
            flexDirection: {
              xs: "row",
              sm: "column",
            },
            gap: { xs: "16px", sm: "24px" },
          }}
        >
          <Paper
            sx={{
              width: "100%",
              minHeight: "250px",
              maxHeight: "400px",
              padding: "12px 8px ",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {userDisplay}
          </Paper>
          <Paper
            sx={{
              width: "100%",
              minHeight: "350px",
              padding: "12px 8px ",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {chatDisplay}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default NerdboardGameContainer;
