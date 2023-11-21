import { useState,useEffect } from 'react'
import  React from "react";
import NavBar from "../NavBar/NavBar"
import Cards from "../Cards/Cards"
import { useDispatch, useSelector } from "react-redux";
import {getDrivers, getDriverByName,order, getTeams, clearFilters, filterOrigin, filterByTeam} from "../../redux/actions"
import styles from "./home.module.css"


const Home = () => {
    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.allTeams)
    const allDriversCopy = useSelector((state) => state.allDriversCopy)

    const teamsState = useSelector((state) => state.allTeams);
    const [isLoading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 9;
const[teams, setTeams] = useState([])
const [filterName, setFilterName] = useState("")
const [filterDob, setFilterDob] = useState("")
const [filterTeam, setFilterTeam] = useState("")
const [originOption, setOriginOption] = useState("")


useEffect(() => {
  dispatch(getDrivers())
  dispatch(getTeams())
  console.log(allDriversCopy)
}, []);




useEffect(() => {
      setTeams(allTeams)
      setIsLoading(false)
      }, [allTeams]);

 const handleOrigin = (e) => {
  setCurrentPage(1);
dispatch(filterOrigin(e.target.value))
setFilterDob("")
setFilterName("")
setOriginOption(e.target.value)
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
    dispatch(getDriverByName(name))
     
      };

      // limpia filtros
      const handleClean=()=>{
        dispatch(clearFilters())
        setCurrentPage(1);       
      }

    //paginado
    const handlePageChange = (page) => {
      setCurrentPage(page);
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
    } else{
      content =  (<div>
     
      <NavBar handlePageChange={handlePageChange} onSearch={onSearch} /> 
      <div  className={styles.selectContainer}>

      <select className={styles.select} onChange={handleOrder} value={filterName} defaultValue="">
  <option value="" disabled>Order by name</option>
  <option value='A'>Ascendente</option>
  <option value='B'>Descendente</option>
</select>

<select  className={styles.select} onChange={handleOrder} value={filterDob} >
  <option    value="" disabled>Order by age</option>
  <option    value='A2'>Ascendente</option>
  <option  value='B2'>Descendente</option>
</select>

<select  className={styles.select}  onChange={handleOrigin} value={originOption} >
  <option   value="" disabled>Select origin</option>
  <option    value='BDD'>Data base</option>
  <option  value='API'>API</option>
</select>

<select  className={styles.select}  onChange={filterTeams} value={filterTeam}  >
  <option value="" disabled>Select Team</option>
  {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
</select>
<button className={styles.button} onClick={handleClean} >Clean Filters</button>

</div>
      <Cards  currentPage={currentPage}
            itemsPerPage={itemsPerPage}    handlePageChange={handlePageChange}  setCurrentPage={setCurrentPage}/>
          </div> )
    }
   
    return <div >
      {content}
      </div>;
  
}

export default Home



