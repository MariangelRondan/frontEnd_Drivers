import React from "react";
import styles from "./landingPage.module.css"
import { Link} from "react-router-dom";
import style from "../generalStyles/general.module.css"


export default function LandingPage(){
    return (
        <div className={styles.landingDiv}>
<div className={styles.text}>
<h1>Welcome to the F1 drivers app</h1>
<p>Click here to know all about your favorite drivers</p>

</div>

<div className={styles.buttonContainer}>
        <Link to={"/home"}>
          <button className={style.button}>Home</button>
        </Link>
      </div>
       </div>

    )
}