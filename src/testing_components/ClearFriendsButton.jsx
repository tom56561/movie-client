import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
const ClearFriendsBtn = () => {
  const token = useSelector((state) => state.token);
  const handleClick = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_API}/profile/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("friends cleared");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button variant="outlined" color="error" onClick={handleClick}>
      Clear Friends
    </Button>
  );
};

export default ClearFriendsBtn;
