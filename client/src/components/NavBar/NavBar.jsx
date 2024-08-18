import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import styles from './NavBar.module.css';

function NavBar(){
    return(
        <nav>
            <h1 className={styles["logo"]}>Henry Pokemon</h1>
            <Search/>
            <ul className={styles["menu-items"]}>
                <li><NavLink to="/PI_pokemon" style={{ textDecoration: 'none', color: 'black'}}>Go Back to Homepage</NavLink></li>
                <li><NavLink to="/create" style={{ textDecoration: 'none', color: 'black'}}>Create New Pokémon</NavLink></li>
            </ul>
        </nav>
    )
};

export default NavBar; 