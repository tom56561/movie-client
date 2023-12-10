import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import MoreButton from "./MoreButton";

const Friend = ({viewer, friendId, name, subtitle, userPicturePath, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = user?.friends;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const obj = viewer ? viewer : friendId;

  const isFriend = friends?.find((friend) => friend._id === user._id);
  // console.log(isFriend, friends, friendId);

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
    dispatch(setFriends({ friends: data }));
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
      {user && user._id !== friendId && (
        <Box mt={"-1rem"} mr={"-1rem"}>
          {friendId === user._id ? (
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
              {isFriend ? (
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
