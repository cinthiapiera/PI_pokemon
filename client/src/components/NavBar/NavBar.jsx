import React from "react";
import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css';

function NavBar(){
    return(
        <nav>
            <h1 className={styles["logo"]}>Henry Pokemon</h1>
            <ul className={styles["menu-items"]}>                
                <li><NavLink to="/" style={{ textDecoration: 'none', color: 'black'}}>Landing</NavLink></li>
                <li><NavLink to="/create" style={{ textDecoration: 'none', color: 'black'}}>Create Pokemon</NavLink></li>
            </ul>
        </nav>
    )
};

export default NavBar; 