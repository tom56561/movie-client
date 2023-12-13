import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const token = useRef(useSelector((state) => state.token));
  const myFriends = useSelector((state) => state.user?.friends);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API}/profile/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token.current}` },
        }
      );
      const data = await response.json();
      setFriends(data);
    };
    getFriends();
  }, [userId, myFriends]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            friend={{
              ...friend,
              name: friend.firstName + " " + friend.lastName,
            }}
            isPost={false}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
