import React from "react";
import styles from "./landingPage.module.css"
import { Link} from "react-router-dom";


export default function LandingPage(){
    return (
        <div className={styles.landingDiv}>
<div className={styles.text}>
<h1>Welcome to the F1 drivers app</h1>
<p>Click below to know all about your favorites...</p>

</div>

<div className={styles.buttonContainer}>
        <Link to={"/home"}>
          <button className={styles.button}>Home</button>
        </Link>
      </div>
       </div>

    )
}