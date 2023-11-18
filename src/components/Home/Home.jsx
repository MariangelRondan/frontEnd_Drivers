import { useState,useEffect } from 'react'
import  React from "react";
import NavBar from "../NavBar/NavBar"
import Cards from "../Cards/Cards"
import { useDispatch, useSelector } from "react-redux";
import {getDrivers, getDriverByName,order, getTeams, clearFilters, filterOrigin, filterByTeam} from "../../redux/actions"
import styles from "./home.module.css"
import { NavLink} from "react-router-dom";

import notFoundImg from "./not-found.jpg"


const Home = () => {
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.allDrivers)
    const driversByName = useSelector((state) => state.driversByName)
    const allTeams = useSelector((state) => state.allTeams)
    const [drivers, setDrivers] = useState([])
 const [errorSearch, setErrorSearch] = useState("")
const [isLoading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 9;
const[teams, setTeams] = useState([])
const [filterName, setFilterName] = useState("")
const [filterDob, setFilterDob] = useState("")
const [filterTeam, setFilterTeam] = useState("")

useEffect(() => {
  dispatch(getDrivers())
  // fetchData()
  dispatch(getTeams())
 
  setIsLoading(false)
}, []);
console.log(allDrivers)
useEffect(() => {
      // setDrivers(allDrivers)
      setTeams(allTeams)
    
      }, [allTeams]);

//Filtrado segun origen
//  const driversFromAPI = allDrivers.filter((driver) => driver.source === 'API');
//  const driversFromBDD = allDrivers.filter((driver) => driver.source === 'BDD');
//    console.log(driversFromBDD)

 const handleOrigin = (e) => {
  setCurrentPage(1);
dispatch(filterOrigin(e.target.value))
 }

//filtro por nombre y dob:
const handleOrder = (e) => {
  dispatch(order(e.target.value))

  if(e.target.value === "A" || e.target.value === "B"){
    setFilterDob("")
    setFilterTeam("")
    setFilterName(e.target.value)
  }
  
  if(e.target.value === "A2" || e.target.value === "B2"){
    setFilterName("")
    setFilterTeam("")
    setFilterDob(e.target.value)
  }
  setCurrentPage(1);


}


  const filterTeams = (e) => {
    dispatch(filterByTeam(e.target.value))
   
    setCurrentPage(1);

  }


    //Busqueda por nombre
    const onSearch =  (name) => {
      setErrorSearch("");
    dispatch(getDriverByName(name))
      if(driversByName.length === 0){
         setErrorSearch("Driver not found");
          } 
      };

      // limpia filtros
      const handleClean=()=>{
        dispatch(clearFilters())
                setCurrentPage(1);
                setErrorSearch("");

      }

    //paginado
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

      //Cruz para cerrar card
    const onClose = (id) => {
      const nuevoArray = drivers.filter((driver) => driver.id !== id);
      setDrivers(nuevoArray);
    };
    
    let content;
    if (isLoading) {
      content = <div className={styles.honeycomb}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    }
     
    if(drivers){
      content =  (<div className={styles.root}>
     
      <NavBar handlePageChange={handlePageChange} onSearch={onSearch} /> 
      <div  className={styles.selectContainer}>

      <select className={styles.select} onChange={handleOrder} value={filterName} defaultValue="">
  <option value="" disabled>Order by name</option>
  <option value='A'>Ascendente</option>
  <option value='B'>Descendente</option>
</select>

<select  className={styles.select} onChange={handleOrder} value={filterDob} defaultValue="">
  <option    value="" disabled>Order by age</option>
  <option    value='A2'>Ascendente</option>
  <option  value='B2'>Descendente</option>
</select>

<select  className={styles.select}  onChange={handleOrigin}  defaultValue="">
  <option   value="" disabled>Select origin</option>
  <option    value='BDD'>Data base</option>
  <option  value='API'>API</option>
</select>

<select  className={styles.select}  onChange={filterTeams} value={filterTeam} defaultValue="" >
  <option value="" disabled>Select Team</option>
  {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
</select>
<button className={styles.button} onClick={handleClean} >Clean Filters</button>

</div>
      <Cards   onClose={onClose}   currentPage={currentPage}
            itemsPerPage={itemsPerPage}    handlePageChange={handlePageChange}  setCurrentPage={setCurrentPage}/>
          </div> )
    }
   
    return <div >
      {content}
      
      </div>;
  
}

export default Home



