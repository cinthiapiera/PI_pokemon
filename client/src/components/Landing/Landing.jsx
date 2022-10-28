import React from "react";
import styles from './Landing.module.css';
import img from './../../image/landing_pokemons.png';
import { Link } from 'react-router-dom';

function Landing() {
    return(
          <main>
              <section className={styles.textP} id="textSide">
                  <h2>Henry<br />Pokémon</h2>
                  <p>SPA with the most complete information on pokémon</p>
                  <Link to="/home">
                    <button>Get start!</button>
                  </Link>
              </section>
              <section className={styles.imgSide}>
                <img src={img} alt="pokemons.png" />
              </section>
          </main>
    )
};

export default Landing; 