import { Box, Button, Typography } from "@mui/material";

interface NerdboardHeaderProps {
  title: string;
  subtitle: string;
  buttonTitle?: string;
  buttonOnClick?: () => void;
}

const NerdboardHeader: React.FC<NerdboardHeaderProps> = ({
  title,
  subtitle,
  buttonTitle,
  buttonOnClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          data-testid="home-title"
        >
          <Typography variant="h1" sx={{ fontWeight: 600, fontSize: "48px" }}>
            {title}
          </Typography>
          <Typography variant="h2">{subtitle}</Typography>
        </Box>
      </Box>
      {buttonTitle && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: {
              xs: "16px",
              sm: "0",
            },
          }}
        >
          <Button
            sx={{
              fontSize: "20px",
            }}
            variant="contained"
            onClick={buttonOnClick}
          >
            {buttonTitle}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NerdboardHeader;
