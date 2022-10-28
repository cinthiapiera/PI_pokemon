import React from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';

function NavBar(){
    return(
        <nav>
            <h2 className={styles.logo}> Henry Pokemon</h2>
            <ul className={styles.menuItems}>                
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/pokemon/:id">Details</Link></li>
                <li><Link to="/pokemonCreate">Create</Link></li>
            </ul>
        </nav>
    )
};

export default NavBar; 