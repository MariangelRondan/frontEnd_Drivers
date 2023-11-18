import { useEffect, useState } from "react";
import Card from "../Card/Card"
import defaultImage from './default-image.jpg'
import styles from "./cards.module.css"
import style from "../generalStyles/general.module.css"
import { useSelector } from "react-redux";


function Cards({ onClose, currentPage, itemsPerPage, handlePageChange, setCurrentPage }) {
  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  // const currentDrivers = byName.length > 0 ? byName : drivers;
  const allDriversCopy = useSelector((state) => state.allDriversCopy)
  const currentDrivers = allDriversCopy;

  const pageDrivers = currentDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const handlePageInput = (e) => {
    // Obtén el nuevo valor del input y conviértelo a un número
    const newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage)) {
      // Si el valor es un número válido, actualiza el estado
      setCurrentPage(newPage);
    }
  };

  return (
    <div > 
   
<div className={styles.pagination}>
        <button className={styles.button} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        
        <div className={styles.inputWrapper}>
      <input
        type="number"
        className={styles.inputBox}
      value={currentPage}
        onChange={handlePageInput}

      /> 
      <span className={styles.underline}></span>
      </div>
             <button className={`${style.button} ${styles.button} `}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastDriver >= currentDrivers.length}

        >
          Next
        </button>
      </div>
      <div className={styles.cardContainer}> 
       
       {pageDrivers.map((driver) => (
         <Card
           key={driver.id}
           id={driver.id}
           name={driver.name}
           lastname={driver.surname || driver.lastname}
           image={driver.image === '' ? defaultImage : driver.image}
           teams={driver.teams}
           onClose={onClose}
         />
       ))}
     
     </div>


    </div>
   
  );
}

export default Cards;




