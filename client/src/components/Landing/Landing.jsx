import React from "react";
import styles from './Landing.module.css';
import img from './../../image/landing_pokemons.png';
import { Link } from 'react-router-dom';

function Landing() {
  return(
    <main>
      <section className={styles['text-side']}>
        <h1>Henry<br />Pokémon</h1>
        <p>This is the most comprehensive application for Pokémon lovers. It allows you to identify all your Pokémon, manage them, and even create them in ways you've never imagined. You can also view their statistics and other data. It's the best app for any Pokémon enthusiast out there</p>
        <Link to="/home">
          <button>Get start!</button>
        </Link>
      </section>
      <section className={styles['img-side']}>
        <img src={img} alt="pokemons.png" />
      </section>
    </main>
  )
};

export default Landing;