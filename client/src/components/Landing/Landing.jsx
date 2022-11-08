import React from "react";
import styles from './Landing.module.css';
import img from './../../image/landing_pokemons.png';
import { Link } from 'react-router-dom';

function Landing() {
  return(
    <main>
      <section className={styles['text-side']}>
        <h1>Henry<br />Pokémon</h1>
        <p>SPA with the most complete information on pokémon</p>
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