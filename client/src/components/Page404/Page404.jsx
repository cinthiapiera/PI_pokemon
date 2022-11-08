import React from "react";
import styles from "./Page404.module.css";
import { Link } from "react-router-dom";

function Page404() {
    return(
        <div className={styles.container}>
            <p>404 | This page could not be found.</p>
            <Link to="/home"><button>Regresar a Home</button></Link>
        </div>
    )
}

export default Page404;