import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navigation from "./components/Navigation";

const LazyHome = lazy(() =>
  import("./pages/homePage/Home" /* webpackChunkName: "Home-page" */)
);
const LazyMovies = lazy(() =>
  import("./pages/moviesPage/Movies" /* webpackChunkName: "Movies-page" */)
);
const LazyMovie = lazy(() =>
  import("./pages/moviePage/Movie" /* webpackChunkName: "Movie-page" */)
);

function App() {
  return (
    <div className={styles.App}>
      <Navigation />
      <Suspense fallback={<h1 className={styles.spinner}>Wait a little...</h1>}>
        <Switch>
          <Route exact path="/" component={LazyHome} />
          <Route path="/movies/:movieId" component={LazyMovie} />
          <Route exact path="/movies" component={LazyMovies} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
