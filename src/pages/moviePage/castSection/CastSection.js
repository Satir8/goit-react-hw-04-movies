import React, { Component } from "react";
import axios from "axios";
import styles from "./CastSection.module.css";

class CastSection extends Component {
  state = {
    cast: null
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const data = await axios.get(
      `${process.env.REACT_APP_BASIC_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_SECURE_KEY}`
    );
    this.setState({ cast: data.data.cast });
  }
  render() {
    const { cast } = this.state;
    return (
      <div className={styles.castWrapper}>
        <ul className={styles.castList}>
          {cast &&
            cast.map(item => {
              return (
                item.profile_path && (
                  <li key={item.id} className={styles.castListItem}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt=""
                      className={styles.castImg}
                    />
                    <p className={styles.castName}>{item.name}</p>
                    <p className={styles.castCharacter}>
                      Character: {item.character}
                    </p>
                  </li>
                )
              );
            })}
        </ul>
      </div>
    );
  }
}

export default CastSection;
