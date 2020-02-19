import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import queryString from "query-string";
import styles from "./Movies.module.css";

class Movies extends Component {
  state = {
    movies: [],
    moviesInput: ""
  };

  async componentDidMount() {
    const urlCheck = queryString.parse(this.props.location.search);
    if (urlCheck.query) {
      const data = await this.fetchMovies(urlCheck.query);
      this.setState({ movies: data.data.results, moviesInput: urlCheck.query });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { moviesInput } = this.state;
    const data = await this.fetchMovies(moviesInput);
    this.setState({ movies: data.data.results });
    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.moviesInput}`
    });
  };

  fetchMovies = async query => {
    const data = await axios.get(
      `${process.env.REACT_APP_BASIC_URL}search/movie?api_key=${process.env.REACT_APP_SECURE_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
    );
    return data;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { movies, moviesInput } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.moviesBox}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              autoComplete="off"
              type="text"
              name="moviesInput"
              value={moviesInput}
              placeholder="Looking for a good film?"
              className={styles.moviesInput}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className={styles.moviesFormBtn}>
            Search
          </button>
        </form>
        <ul className={styles.moviesList}>
          {movies.map(item => {
            const { id, title } = item;
            return (
              <li key={id}>
                {
                  <Link
                    to={{
                      pathname: `movies/${id}`,
                      state: { location, id }
                    }}
                  >
                    {title}
                  </Link>
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Movies;
