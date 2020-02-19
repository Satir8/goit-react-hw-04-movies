import React, { Component } from "react";
import axios from "axios";
import styles from "./ReviewSection.module.css";

class ReviewsSection extends Component {
  state = {
    reviews: null
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const data = await axios.get(
      `${process.env.REACT_APP_BASIC_URL}movie/${movieId}/reviews?api_key=${process.env.REACT_APP_SECURE_KEY}&language=en-US&page=1`
    );
    this.setState({ reviews: data.data.results });
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews ? (
          <ul className={styles.reviewList}>
            {reviews.map(item => (
              <li key={item.id}>
                <h4>{item.author}</h4>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>There is no reviews for this movie...</p>
        )}
      </>
    );
  }
}

export default ReviewsSection;
