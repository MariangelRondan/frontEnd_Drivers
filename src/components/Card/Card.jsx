import React from "react";
import { useState,useEffect } from "react";
// import { connect } from "react-redux";
// import { addFav, removeFav } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./card.module.css"
import style from "../generalStyles/general.module.css"



const Card = (props) => {
const {name,image, lastname, teams, onClose, id} = props;

const handleClose = ()=> {
 onClose(id)
}


// PARA AGREGAR A FAV
// const [isFav, setIsFav] = useState(false) 

// const handleFavorite=()=>{
//     if(isFav){
// removeFav(id)
//     } else {
//         addFav(props)
//     }
//     setIsFav(!isFav)
// }

// useEffect(()=> {
//     myFavorites.forEach((fav)=> {
//         if(fav.id === id){
//             setIsFav(true)
//         }
//     })
// }, [myFavorites])



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
<button className={`${style.button} ${styles.close}${styles.btn}`}  onClick={handleClose}>X</button>
  {/* {
         isFav ? (
            <button className={`${style.button} ${styles.close}${styles.btn}`}  onClick={handleFavorite}>❤️</button>
         ) : (
            <button className={`${style.button} ${styles.close}${styles.btn}`}  onClick={handleFavorite}>🤍</button>
         )
      }   */}
      </div>

    </div>

)

}

//envío las actions addFav y removeFav a props
// function mapDispatchToPorps(dispatch){
//     return{
//         addFav: (character) =>{ 
//             dispatch(addFav(character))
//         },
//         removeFav: (id) => {
//             dispatch(removeFav(id))
//         }
//     }

// }

// //envío myFavorites(estado global a props)
// function mapStateToProps(state){
//     return{
//         myFavorites: state.myFavorites,
//     }
// }

// export default connect(mapStateToProps, mapDispatchToPorps)(Card)
export default Card;




