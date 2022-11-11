import React from "react";
import styles from "./Page404.module.css";
import img from "./../../image/404page.png";
import { Link } from "react-router-dom";

function Page404() {
    return(
        <div className={styles["page-container"]}>
            <img src={img} alt="404 not found" width="500px" heigth="300px"/>
            <div className={styles["page-title"]}>
                <p>The page you were looking doesn't exist</p>
            <Link to="/home"><button className={styles["page-button-back"]}> 🡠 Back to home</button></Link>
            </div>
        </div>    
    )
}

export default Page404;