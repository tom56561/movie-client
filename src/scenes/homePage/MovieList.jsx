import Movie from "./Movie";
import ScrollableList from "components/ScrollableList";
export default function MovieList({ movies, onSelectMovie }) {
  return (
    <div className="list list-movies">
      <ScrollableList
        items={movies?.map((movie) => (
          <Movie
            key={movie.imdbID}
            movie={movie}
            onSelectMovie={onSelectMovie}
          />
        ))}
      />
    </div>
  );
}
