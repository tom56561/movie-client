import ReviewWidget from "./ReviewWidget";

const ReviewsWidget = ({ reviews, imdbId, onRefresh }) => {
  return (
    <>
      {reviews.map(({ id, content, date, user }) => (
        <ReviewWidget
          key={id}
          postId={id}
          friend={{
            _id: user.userId,
            name: user.name,
            location: user.location,
            picturePath: user.picturePath,
          }}
          date={date}
          content={content}
          onRefresh={onRefresh}
          imdbId={imdbId}
        />
      ))}
    </>
  );
};

export default ReviewsWidget;
