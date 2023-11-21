import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css"

const Card = (props) => {
const {name,image, lastname, teams, id} = props;


return (
    <div className={styles.card}>
      <div className={styles.top}>
      <img src={image}/>
      <Link to={`/detail/${id}`}>
     <div className={styles.title}>
     <span >{name}</span>
     <br></br>
     <span >{lastname}</span>
      </div> 
      </Link>
  </div>
     <p className={styles.desc}>{teams}</p>
     <div className={styles.buttonsContainer}>
      </div>
    </div>
)

}

export default Card;




