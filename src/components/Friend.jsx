import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import MoreButton from "./MoreButton";

const Friend = ({ friend, onDelete, isPost = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friendId = friend?._id;
  const name = friend.name;
  const subtitle = friend?.occupation ?? friend?.location ?? "";
  const userPicturePath = friend?.picturePath;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const doIknowHim = user.friends?.find((fid) => fid === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API}/profile/${user._id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setMyFriends({ friends: data.map((f) => f._id) }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          display="flex"
          mt={"-1rem"}
        >
          <UserImage image={userPicturePath} size="35px" />
          <Box ml={"1rem"}>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </FlexBetween>
      {user && (friendId !== user._id || isPost) && (
        <Box mt={"-1rem"} mr={"-1rem"}>
          {isPost && friendId === user._id ? (
            <MoreButton
              bg={primaryLight}
              color={primaryDark}
              onDelete={onDelete}
            />
          ) : (
            <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              {doIknowHim ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )}
            </IconButton>
          )}
        </Box>
      )}
    </FlexBetween>
  );
};

export default Friend;
