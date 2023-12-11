import { Alert, Box, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "scenes/homePage/Loader";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useRef(useSelector((state) => state.token));
  const me = useRef(useSelector((state) => state.user));
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const friends = useSelector((state) => state.user.friends);
  useEffect(() => {
    if (userId === me.current._id) {
      setUser(me.current);
      return;
    }
    const getUser = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_API}/profile/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token.current}` },
      });
      const data = await response.json();
      setUser(data);
    };
    getUser();
  }, [friends, userId]);

  if (!user) return <Loader />;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box mt="2rem">
            <FriendListWidget userId={userId} />
          </Box>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
          {userId === me.current._id ? (
            <MyPostWidget picturePath={user.picturePath} />
          ) : (
            <Alert severity="info" style={{ fontSize: "16px" }}>
              {user.firstName}'s posts:
            </Alert>
          )}
          <PostsWidget userId={userId} isProfile={true}/>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
