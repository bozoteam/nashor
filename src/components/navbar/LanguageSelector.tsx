import React from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      displayEmpty
      size="small"
      sx={{
        marginRight: 2,
        "& [role=combobox]": {
          display: "flex",
        },
      }}
      inputProps={{ "aria-label": "Language Selector" }}
      aria-label="Select language"
    >
      <MenuItem value="en">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="https://hatscripts.github.io/circle-flags/flags/us.svg"
            alt="English"
            width="25"
            height="25"
          />
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            English
          </Typography>
        </Box>
      </MenuItem>
      <MenuItem value="pt">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="https://hatscripts.github.io/circle-flags/flags/br.svg"
            alt="Português"
            width="25"
            height="25"
          />
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            Português
          </Typography>
        </Box>
      </MenuItem>
    </Select>
  );
};

export default LanguageSelector;
