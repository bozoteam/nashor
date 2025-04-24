import { Box } from "@mui/material";
import { ReactNode } from "react";

const NerdboardContainer = ({ children }: { children: ReactNode }) => {
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
          flexDirection: "column",
          margin: { xs: "24px", sm: "32px" },
          gap: {
            xs: "16px",
            sm: "24px",
          },
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default NerdboardContainer;
