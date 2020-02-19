import React, { Component, lazy, Suspense } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import axios from "axios";
import styles from "./Movie.module.css";

const LazyReviewsSection = lazy(() =>
  import(
    "./reviewsSection/ReviewsSection" /* webpackChunkName: "Rewiews-section" */
  )
);
const LazyCastSection = lazy(() =>
  import("./castSection/CastSection" /* webpackChunkName: "Cast-section" */)
);

class Movie extends Component {
  state = {
    film: null,
    filmId: null
  };

  handleGoBack = () => {
    const { location } = this.props;

    if (location.state) {
      return this.props.history.push(location.state.location);
    }
    this.props.history.push("/");
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const data = await axios.get(
      `${process.env.REACT_APP_BASIC_URL}movie/${movieId}?api_key=${process.env.REACT_APP_SECURE_KEY}&language=en-US`
    );
    this.setState({ film: data.data });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.film !== this.state.film) {
      this.setState({ film: this.state.film, filmId: this.state.film.id });
    }
  }

  render() {
    const { film, filmId } = this.state;
    return (
      <>
        {film && (
          <>
            <button
              type="button"
              className={styles.goBackBtn}
              onClick={this.handleGoBack}
            >
              Go Back
            </button>
            <div className={styles.moviePageBox}>
              <img
                className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${film.poster_path}`}
                alt=""
              />
              <div className={styles.movieInfoWrapper}>
                <h2>{film.title}</h2>
                <p>User Score: {Math.round(film.vote_average * 10)}%</p>
                <h4>Overview</h4>
                <p className={styles.Overview}>{film.overview}</p>
                <h4>Genres</h4>
                <ul className={styles.genreList}>
                  {film.genres.map(item => {
                    const { id, name } = item;
                    return <li key={id}>{name}</li>;
                  })}
                </ul>
              </div>
            </div>
            <>
              <div className={styles.additionalInfoWrapper}>
                <h4 className={styles.additionalInfoHeading}>
                  Additional information
                </h4>
                <ul className={styles.additionainfolList}>
                  <li>
                    <NavLink
                      to={{ pathname: `/movies/${filmId}/cast` }}
                      className={styles.additionainfolLink}
                      activeStyle={{ color: " rgba(255, 100, 100, 0.7)" }}
                    >
                      Cast
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={{ pathname: `/movies/${filmId}/reviews` }}
                      className={styles.additionainfolLink}
                      activeStyle={{ color: " rgba(255, 100, 100, 0.7)" }}
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Suspense fallback={<h1>Wait a little...</h1>}>
                <Switch>
                  <Route
                    path={`/movies/:movieId/cast`}
                    component={LazyCastSection}
                  />
                  <Route
                    path={`/movies/:movieId/reviews`}
                    component={LazyReviewsSection}
                  />
                </Switch>
              </Suspense>
            </>
          </>
        )}
      </>
    );
  }
}

export default Movie;
