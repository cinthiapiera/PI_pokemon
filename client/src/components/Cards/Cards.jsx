import React from "react";
import styles from './Cards.module.css';


function Cards({id, name, image, attack, types}) {
    return(
        <div className={styles["container"]}>
            <div className={styles["rowpadding"]}>
                <div className={styles["card"]} key={id}>
                    <div className={styles["cardImage"]}>
                        <img src={image} alt="pokemon" width="190px" heigth="190px"/>
                    </div>
                    <div className={styles["title"]}>Name: </div>
                    <div className={styles["heading"]}>{name}
                        <div className={styles["types"]}>Type:
                            <span className={styles["badge"]}> {types}</span>
                        </div>
                        <div className={styles["types"]}>Attack:
                            <span className={styles["badge"]}> {attack}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};

export default Cards; 