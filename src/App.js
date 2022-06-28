import React, { useCallback, useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  let content = <p>Not found data</p>;

  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;
  if (!error && !isLoading) content = <MoviesList movies={dummyMovies} />;

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);

      const fetchMovies = await fetch("https://swapi.dev/api/films");

      if (!fetchMovies.ok) throw new Error("Something new error!");

      const data = await fetchMovies.json();

      const filmDummy = data.results.map((film) => {
        return {
          title: film.title,
          releaseDate: film.release_date,
          openingText: film.opening_crawl,
        };
      });

      setDummyMovies(filmDummy);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);

    // .then((data) => data.json())
    // .then((response) => {
    //   const filmDummy = response.results.map((film) => {
    //     return {
    //       title: film.title,
    //       releaseDate: film.release_date,
    //       openingText: film.opening_crawl,
    //     };
    //   });

    //   setDummyMovies(filmDummy);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
