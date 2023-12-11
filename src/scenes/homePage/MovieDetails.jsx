import { useEffect, useRef, useState } from "react";

import { useKey } from "../../hooks/useKey";
import MyReviewWidget from "scenes/widgets/MyReviewWidget";
import ReviewsWidget from "scenes/widgets/ReviewsWidget";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { Button, Alert, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { ThumbUp, ThumbUpOffAlt } from "@mui/icons-material";

// const KEY = "b2453ff5"
const KEY = "ea351ee5";

export default function MovieDetails({
  selectedId,
  onSeeMine,
  onReturn,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const countRef = useRef(0);
  const [relatedData, setRelatedData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onSeeMine();
  }

  useKey("Escape", onReturn);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      let res = await axios.get(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.data;
      if (data.Poster === "N/A") {
        data.Poster = "../../../assets/Movie Poster.png";
      }
      res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/movie/details/${selectedId}`
      );
      setMovie(data);
      setRelatedData(res.data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId, refresh]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "CineSocial Hub";
      };
    },
    [title]
  );

  const likeMovie = async () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_API}/movie/like/${selectedId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikeMovie = async () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_API}/movie/like/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img
              src={poster ?? "../../../assets/Movie Poster.png"}
              alt={`Poster of ${title} movie`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
              <p>{relatedData?.likes?.length} like it</p>
              {user && (
                <IconButton
                  onClick={() => {
                    relatedData.likes.includes(user._id)
                      ? unlikeMovie()
                      : likeMovie();
                  }}
                >
                  {relatedData.likes.includes(user._id) ? (
                    <ThumbUp fontSize="large" />
                  ) : (
                    <ThumbUpOffAlt fontSize="large" />
                  )}
                </IconButton>
              )}
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <div>
            {user && (
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated this movie {watchedUserRating} <span>⭐</span>
                  </p>
                )}
                <Button variant="outlined" color="success" onClick={onSeeMine}>
                  See movie you watched
                </Button>
              </div>
            )}

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </div>
          {/* Middle Middle: Post Function */}
          {user && user.role === "critic" && (
            <MyReviewWidget
              picturePath={user.picturePath}
              imdbId={relatedData.imdbId}
              onRefresh={() => setRefresh(!refresh)}
            />
          )}
          {/* Middle Down: Others Posts  */}
          <Alert severity="success">Comments:</Alert>
          <ReviewsWidget
            reviews={relatedData.reviews}
            onRefresh={() => setRefresh(!refresh)}
            imdbId={relatedData.imdbId}
          />
        </>
      )}
    </div>
  );
}
