import React from "react";
import styles from './Landing.module.css';
import img from './../../image/landing_pokemons.png';
import { Link } from 'react-router-dom';

function Landing() {
  return(
    <main>
      <section className={styles['text-side']}>
        <h1>Henry<br />Pokémon</h1>
        <p>This is the most complete application for pokémon lovers. It will allow you to identify all your pokémon, manage them and created them in ways that you will never imagine. You can also see their statistics, anddata in general. The best app for any pokemaniacs out there</p>
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