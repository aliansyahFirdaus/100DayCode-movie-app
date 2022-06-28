import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [dummyMovies, setDummyMovies] = useState([]);

  const fetchMovies = () => {
    fetch("https://swapi.dev/api/films")
      .then((data) => data.json())
      .then((response) => {
        const filmDummy = response.results.map((film) => {
          return {
            title: film.title,
            releaseDate: film.release_date,
            openingText: film.opening_crawl,
          };
        });

        setDummyMovies(filmDummy);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(dummyMovies);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
