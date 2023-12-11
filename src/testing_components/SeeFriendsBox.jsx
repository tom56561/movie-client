import React from "react";
import { Button, Input, Box } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
const SeeFriendsBox = () => {
  const token = useSelector((state) => state.token);
  const [userId, setUserId] = React.useState(useSelector((state) => state.user._id));
  const handleClick = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_API}/profile/${userId}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <Input className="search" placeholder='enter user id' value={userId} onChange={(e) => setUserId(e.target.value)} />
      <Button variant="outlined" color="error" onClick={handleClick}>
        See Friends
      </Button>
    </Box>
  );
};

export default SeeFriendsBox;
