import {
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

const ReviewWidget = ({
  postId,
  postUserId,
  name,
  date,
  content,
  location,
  picturePath,
  imdbId,
  onRefresh,
}) => {

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const token = useSelector((state) => state.token);
  const deleteReview = async () => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_API}/movie/review/${imdbId}/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((res) => {
      if (res.status === 200) {
        onRefresh();
      }
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={picturePath}
        onDelete={deleteReview}
      />
      <Typography color={main} >
        {content}
      </Typography>

      <FlexBetween mt="0.25rem">
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ReviewWidget;
