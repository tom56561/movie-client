import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
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
import { useMemo, useState } from "react";
import { useMovies } from "../../hooks/useMovies";
// import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import Form from "scenes/loginPage/Form";

const HomePage = () => {
  // const { _id, picturePath } = useSelector((state) => state.user);
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
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

  useMemo(() => {
    if (!user) return;
    setWatched(JSON.parse(localStorage.getItem(user._id)) || []);
  }, [user]);

  useMemo(
    () => {
      if (!user) return;
      localStorage.setItem(user._id, JSON.stringify(watched));
    },
    [watched, user]
  );

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
        {/* 1st part: Login Form or User Widget */}
        {isNonMobileScreens &&
          (user ? (
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={user._id} picturePath={user.picturePath} />
            </Box>
          ) : (
            <Box
              width={isNonMobileScreens ? "20%" : "93%"}
              p="2rem"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                Welcome to Socipedia, the Social Media for Sociopaths!
              </Typography>
              <Form />
            </Box>
          ))}

        {/* 2nd part: Search Bar and Movie List */}
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

        {/* 3rd part: movie details or summary */}
        {isNonMobileScreens && (user !== null || detailPage === 0) && (
          <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
            {(selectedId || detailPage !== 0) &&
              (detailPage === 0 ? (
                <MovieDetails
                  selectedId={selectedId}
                  onSeeMine={() => setDetailPage(1)}
                  onReturn={() => setSelectedId(null)}
                  onAddWatched={handleAddWatched}
                  watched={watched}
                />
              ) : (
                user !== null && (
                  <div>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList
                      watched={watched}
                      onDeleteWatched={handleDeleteWatched}
                    />
                  </div>
                )
              ))}
          </Box>
        )}

        {/* 4th part: Advert and Friends */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {user && <FriendListWidget userId={user._id} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
