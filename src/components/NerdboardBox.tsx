import { Box, Paper } from "@mui/material";

function NerdboardBox({ children }: { children: React.ReactNode }) {
  return (
    <Box className="p-4 md:p-6 z-1 flex justify-center flex-grow">
      <Paper
        sx={{
          padding: "12px",
          flexGrow: 1,
          maxWidth: "1280px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

export default NerdboardBox;
