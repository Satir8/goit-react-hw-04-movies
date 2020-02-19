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
            const { id, title } = movie;
            return (
              <li key={id}>
                <Link
                  to={{
                    pathname: `movies/${id}`,
                    state: { location, id  }
                  }}
                >
                  {title}
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
