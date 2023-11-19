import React from "react";
import { useState } from "react";
import styles from "./searchBar.module.css"
import style from "../generalStyles/general.module.css"


export default function SearchBar(props){
   const { handlePageChange, onSearch} = props; 
const [name, setName] = useState("");


const handleChange = (event) => {
setName(event.target.value)
handlePageChange(1)
}

  const clearInput = () => {
    setName('');
  };

return (
    <div className={`${style.inputWrapper} ${styles.inputWrapper}`}>
    <div  className={`${style.inputContainer} ${styles.inputContainer}`}>
      <input
       className={`${style.inputBox} ${styles.inputBox}`} 
        onChange={handleChange}
        type="text"
        placeholder="Driver's name..."
        value={name}
      />
      {name && (
        <div className={styles.clearButton} onClick={clearInput}>
          ✕
        </div>
      )}
    </div>
    <button className={styles.button} onClick={() => onSearch(name)}>
      Search
    </button>
  </div>
)
}