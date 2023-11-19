import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink} from "react-router-dom";
import styles from "./navbar.module.css"

export default function NavBar(props){
const {onSearch, handlePageChange} = props;


    return (
        <div className={styles.container}>
<NavLink className={styles.navLink} to={"/create"} ><button className={`${styles.button}`}>Create a new driver</button></NavLink>
<SearchBar className={styles.navLink} onSearch={onSearch} handlePageChange={handlePageChange}  />
        </div>
    )
} 
