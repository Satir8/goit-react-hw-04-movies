import React from "react";
import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className={styles.navigationBox}>
    <ul className={styles.navigationList}>
      <li>
        <NavLink
          to="/"
          activeStyle={{ color: " rgba(255, 100, 100, 0.7)" }}
          exact
          className={styles.navigationLink}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          activeStyle={{ color: " rgba(255, 100, 100, 0.7)" }}
          className={styles.navigationLink}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
