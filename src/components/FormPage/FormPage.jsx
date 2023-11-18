import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import styles from "./FormPage.module.css"
import { Link } from "react-router-dom";
import style from "../generalStyles/general.module.css"
import validation from "../../validation";

export default function FormPage(){
const[teams, setTeams] = useState([])

const [errors, setErrors] = useState({})

const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    description: '', 
    nationality: '',
    dob: '',
    image: '',
   teams: []
})


async function fetchData() {
  try {
    const {data} =  await axios("http://localhost:3001/teams")
  if(data) {
        setTeams(data)
  }
  } catch (error) {
    console.log(error.message)
  }
}

useEffect(()=> {
  fetchData()
}, [])

const [selectedTeams, setSelectedTeams] = useState([]);
const [showOptions, setShowOptions] = useState(false);

const handleTeamChange = (event) => {
  const { value } = event.target;
  if (selectedTeams.includes(value)) {
    // Desmarca un equipo si ya está seleccionado
    setSelectedTeams(selectedTeams.filter((team) => team !== value));
  } else {
    // Marca un equipo si no está seleccionado
    setSelectedTeams([...selectedTeams, value]);
  }
};

    const selectedTeamIds = [];
    // Recorre los equipos disponibles
    teams.forEach((team) => {
      // Si el nombre del equipo está en la lista de equipos seleccionados, agrega su ID
      if (selectedTeams.includes(team.name)) {
        selectedTeamIds.push(team.id);
      }
    });



const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
   
}

const handleSubmit = async (e) => {
  e.preventDefault(); // Evita la acción predeterminada del formulario (enviar)
  const validationErrors = validation(formData);
  setErrors(validationErrors);
  // Tu lógica de envío del formulario aquí
  try {
    const response = await fetch('http://localhost:3001/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        lastname: formData.lastname,
        description: formData.description,
        nationality: formData.nationality,
        dob: formData.dob,
        image: formData.image,
        teams: selectedTeamIds // IDs de los equipos seleccionados
      })
      
      ,
      // { ...formData, teams: selectedTeams }
    });
    console.log(formData)
    if (response.ok) {
    
      const data = await response.json();
      console.log(data);
      window.alert("Driver created successfully");
    // } else {
    //   const errorData = await response.json();
    //   console.error('Request error:', errorData);
    //   window.alert("Error: " + errorData.error);    
  }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
    
console.log(selectedTeams)

return (
  <div className={styles.container}>
   <Link to={`/home`}>
    <button className={`${style.button} ${styles.button} `} >Back</button>
    </Link>
  
  
    <div className={styles.create}>
    
    <div className="">
    <form onSubmit={handleSubmit}> 
<h1 className={styles.h1}>New driver</h1>
<label >
        * Name:
      </label>
      <input 
        type="text"
        name="name"
        placeholder="Name..."
        value={formData.name}
        onChange={handleChange}
        className={styles.space}
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}

         <label className={styles.space}>
        * Lastname:
      </label>
       <input 
        type="text"
        name="lastname"
        placeholder="Lastname...."
        value={formData.lastname}
        onChange={handleChange}
        className={styles.space}
      />
     {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
      
       <label className={styles.space}>
       * Description:
      </label>
       <input
        type="text"
        name="description"
        placeholder="Description...."
        value={formData.description}
        onChange={handleChange}
        className={styles.space}
      />
             {errors.description && <p className={styles.error}>{errors.description}</p>}

         <label className={styles.space}>
       Nacionality:
      </label>
      <input
        type="text"
        name="nationality"
        placeholder="Nationality"
        value={formData.nationality}
        onChange={handleChange}
        className={styles.space}
      />  
           {errors.nationality && <p className={styles.error}>{errors.nationality}</p>}
          <label className={styles.space}>
         * Date of birth:
      </label>
       <input
        type="date"
        name="dob"
        placeholder="Date"
        value={formData.dob}
        onChange={handleChange}
        className={styles.space}
      />
                 {errors.dob && <p className={styles.error}>{errors.dob}</p>}

      <label className={styles.space}>
        Image:
      </label>
      {/* <input type="file" 
          id="image" 
          name="image" 
          accept="image/*"
            value={formData.image}
        onChange={handleChange}
        className={styles.space}/> */}
        <input type='text' 
          id="image" 
          name="image" 
          accept="image/*"
            value={formData.image}
        onChange={handleChange}
        className={styles.space}/>
  <button type="button" className={`${styles.btn} ${styles.space} `} onClick={() => setShowOptions(!showOptions)}>
            Team selector:
          </button>
          {showOptions && (
            <select
            multiple
            name="teams"
            value={selectedTeams}
            onChange={handleTeamChange}
          >

            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          )}

   <div>Equipos seleccionados: {selectedTeams.join(", ")}</div>

      <input className={`${styles.btn} ${styles.space} `} type="submit" value={'Create'}/>

</form>

    </div>
  </div>
  </div>
  



)

}