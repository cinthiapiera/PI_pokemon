import React from "react";
import styles from "./Loading.module.css";

function Loading() {
  return(
    <div>
      <div className={styles["lds-dual-ring"]}></div>
      {/* <div className={styles["shadow"]}></div>
        <div className={styles["pokeball"]}>
            <div className={styles["top"]}></div>
            <div className={styles["bottom"]}></div>
            <div className={styles["middle"]}></div>
      </div> */}
    </div>
  )
}

export default Loading;