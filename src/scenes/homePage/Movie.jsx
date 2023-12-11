export default function Movie({ movie, onSelectMovie }) {
  return (
    <div
      key={movie.imdbID}
      onClick={() => onSelectMovie(movie.imdbID)}
      id="movieBox"
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />

      <div style={{marginLeft:"2px"}}>
        <h3>{movie.Title}</h3>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </div>
  );
}
