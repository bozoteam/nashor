import { Box, Paper } from "@mui/material";

function NerdboardBox({ children }: { children: React.ReactNode }) {
  return (
    <Box className="p-4 pt-8 md:p-8 z-1 flex justify-center flex-grow">
      <Paper
        sx={{
          padding: "12px",
          flexGrow: 1,
          maxWidth: "1000px",
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
