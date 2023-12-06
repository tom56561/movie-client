import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MovieList from "./MovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useMovies } from "../../hooks/useMovies";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const [seeing, setSeeing] = useState(false);
  const [detailPage, setDetailPage] = useState(null);
  function handleSelectMovie(id) {
    if (id === selectedId) {
      setDetailPage(detailPage === null ? 0 : detailPage ^ 1);
      return;
    }
    setSelectedId(id);
    setDetailPage(0);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <Box>
      <Navbar />
      {!isNonMobileScreens && detailPage !== null && (
        <button
          className="btn-back"
          onClick={() => {
            setDetailPage(detailPage === 0 ? null : detailPage - 1);
          }}
        >
          ←
        </button>
      )}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {/* Left: User Profile  */}
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
        )}

        {!isNonMobileScreens && selectedId && detailPage !== null ? (
          detailPage === 0 ? (
            <MovieDetails
              selectedId={selectedId}
              onSeeMine={() => setDetailPage(1)}
              onReturn={() => setSelectedId(null)}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )
        ) : (
          <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
            <SearchBar query={query} setQuery={setQuery} />
            <Box>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              )}
              {error && <ErrorMessage message={error} />}
            </Box>
          </Box>
        )}

        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
            {(selectedId || detailPage !== 0) && (detailPage === 0 ? (
              <MovieDetails
                selectedId={selectedId}
                onSeeMine={() => setDetailPage(1)}
                onReturn={() => setSelectedId(null)}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            ))}
          </Box>
        )}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* Right: Advert and Friends */}
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
