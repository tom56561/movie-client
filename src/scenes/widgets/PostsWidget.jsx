import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import ScrollableList from "components/ScrollableList";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useRef(useDispatch());
  const posts = useSelector((state) => state.posts);
  const token = useRef(useSelector((state) => state.token));

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_API}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token.current}` },
      });
      const data = await response.json();
      dispatch.current(setPosts({ posts: data }));
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
      dispatch.current(setPosts({ posts: data }));
    };
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile, posts.length]);

  const items = posts.map(
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
