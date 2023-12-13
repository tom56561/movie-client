import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

function MoreButton({ bg, color, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    onDelete();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton sx={{ backgroundColor: bg, p: "0.6rem", marginLeft: "0.2rem" }} onClick={handleClick}>
        <MoreHoriz sx={{ color: color }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        {/* Add more MenuItems as needed */}
      </Menu>
    </>
  );
}

export default MoreButton;
