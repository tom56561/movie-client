import { useEffect, useRef } from "react";

import { useKey } from "../../hooks/useKey";
import { Clear } from "@mui/icons-material";
import { Input, IconButton, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Box } from "@mui/material";
export default function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  function handleSearch() {
    console.log(query);
    setQuery("");
  }

  return (
    <Box>
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="9px"
        gap="3rem"
        padding="0.1rem 1.5rem"
      >
        <Input
          className="search"
          fullWidth
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputEl}
        />
        <IconButton onClick={handleSearch}>
          <Clear />
        </IconButton>
      </FlexBetween>
    </Box>
  );
}
