import React, { useState, useEffect, useRef } from "react";
import { List, ListItem, ListItemText, Box } from "@mui/material";

function ScrollableList({ items }) {
  const [listHeight, setListHeight] = useState(0);
  const listRef = useRef(null);

  const updateListHeight = () => {
    if (listRef.current) {
      const rect = listRef.current.getBoundingClientRect();
      const heightFromComponentToWindowBottom = window.innerHeight - rect.top;
      setListHeight(heightFromComponentToWindowBottom + 10);
    }
  };

  useEffect(() => {
    updateListHeight();
    window.addEventListener("resize", updateListHeight);
    return () => window.removeEventListener("resize", updateListHeight);
  }, []);
  return (
    <Box
      className="scrollable-element"
      ref={listRef}
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: `${listHeight}px`,
        overflowY: "auto",
      }}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ScrollableList;
