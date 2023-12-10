import ReviewWidget from "./ReviewWidget";

const ReviewsWidget = ({ reviews, imdbId, onRefresh }) => {
  return (
    <>
      {reviews.map(
        ({
          id,
          content,
          date,
          user,
        }) => (
          <ReviewWidget
            key={id}
            postId={id}
            postUserId={user.userId}
            name={`${user.name}`}
            date={date}
            content={content}
            location={user.location}
            picturePath={user.picturePath}
            onRefresh={onRefresh}
            imdbId={imdbId}
          />
        )
      )}
    </>
  );
};

export default ReviewsWidget;
