import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "./detail.module.css"
import defaultImage from './default-image.jpg'
import { Link } from "react-router-dom";
import style from "../Cards/cards.module.css"


const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getDriverByID = async (id) => {
      const endpoint = `http://localhost:3001/drivers/${id}`;
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
        console.log(data)
        if (data.name) {
          setDriver(data);
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDriverByID(id);
  }, [id]);

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
  } else if (driver.name) {
    content = (
      <div className={styles.imageAndDescription}>
  <img src={driver.image === "" ? defaultImage : driver.image} />
  <div className={styles.card}>
    <h1>{driver.name} {driver.surname || driver.lastname}</h1>
    <p  className={styles.title}>ID: </p> <p>{driver.id}</p>
    <p  className={styles.title}>Nationality:</p> <p>{driver.nationality}</p>
    <p className={styles.title}>Date of birth:</p><p>{driver.dob}</p>

    <p className={styles.title}>Description:</p><p>{driver.description}</p>
    <p className={styles.title}>Teams:</p> <p> {Array.isArray(driver.teams) ? driver.teams.join(', ') : driver.teams}</p>
  </div>
  <Link to={`/home`}>
    <button className={style.button}>Back</button>
    </Link>
</div>

    );
  } else {
    content = <p>No se encontraron datos para el personaje.</p>;
  }

  return <div className={styles.container}>
    {content}
    
    </div>;

};

export default Detail;
