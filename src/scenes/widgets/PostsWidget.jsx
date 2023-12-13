import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import ScrollableList from "components/ScrollableList";
import Loader from "scenes/homePage/Loader";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useRef(useDispatch());
  const posts = useSelector((state) => state.posts);
  const token = useRef(useSelector((state) => state.token));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_API}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token.current}` },
      });
      const data = await response.json();
      dispatch.current(setPosts({ posts: data }));
      setLoading(false);
    };

    const getUserPosts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API}/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token.current}` },
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch.current(setPosts({ posts: data }));
      setLoading(false);
    };
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile, posts?.length]);

  if (loading) return <Loader />;

  const items = posts?.map(
    ({
      _id,
      userId,
      firstName,
      lastName,
      description,
      location,
      picturePath,
      userPicturePath,
      likes,
      comments,
    }) => (
      <PostWidget
        key={_id}
        friend={{
          _id: userId,
          name: `${firstName} ${lastName}`,
          location: location,
          picturePath: userPicturePath,
        }}
        content={description}
        picturePath={picturePath}
        postId={_id}
        likes={likes}
        comments={comments}
        
      />
    )
  );

  return <ScrollableList items={items}/>;
};

export default PostsWidget;
