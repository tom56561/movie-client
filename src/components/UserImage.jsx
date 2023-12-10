import { Box, Avatar } from "@mui/material";


const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${process.env.REACT_APP_BASE_API}/assets/${image}`}
      />
      {/* <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_BASE_API}/assets/${image}`} size="lg" /> */}
    </Box>
  );
};

export default UserImage;
