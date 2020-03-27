import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import axios from "axios";

class Home extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    const data = await axios.get(
      `${process.env.REACT_APP_BASIC_URL}trending/all/day?api_key=${process.env.REACT_APP_SECURE_KEY}`
    );
    this.setState({ movies: data.data.results });
  }

  render() {
    const { movies } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.homepageBox}>
        <h2 className={styles.homepageTitle}>Trending today!</h2>
        <ul className={styles.homepageList}>
          {movies.map(movie => {
            const { id, title, poster_path } = movie;
            return (
              <li key={id} className={styles.listItem}>
                <Link
                  to={{
                    pathname: `movies/${id}`,
                    state: { location, id }
                  }}
                  className={styles.listItemLink}
                >
                  {poster_path ? (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
                        alt="Poster"
                        className={styles.movieImg}
                      />
                      <div className={styles.overlay}></div>
                    </>
                  ) : (
                    <p className={styles.backdropText}>
                      Sorry, no image here...
                    </p>
                  )}

                  <h4 className={styles.movieTitle}>
                    {title ? (
                      title.length < 35 ? (
                        title
                      ) : (
                        title.slice(0, 34) + "..."
                      )
                    ) : (
                      <p className={styles.titleBackdrop}>
                        Sorry, title not found...
                      </p>
                    )}
                  </h4>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
