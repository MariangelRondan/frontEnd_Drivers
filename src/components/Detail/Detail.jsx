import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "./detail.module.css"
import defaultImage from './default-image.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getDriverByID } from '../../redux/actions';
import style from "../Cards/cards.module.css"

const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({}); // Modificación 1
  const dispatch = useDispatch();
  const driverById = useSelector((state) => state.driverById);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDriverByID(id));
      
      } catch (error) {
     console.log(error.message)
       
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    setDriver(driverById);
  }, [driverById]);

  let content;

  if (driver.name !== undefined && driver.name !== "") { 
    content = (
      <div className={styles.imageAndDescription}>
        <img src={driver.image === "" ? defaultImage : driver.image} alt={`Image of ${driver.name}`} />
        <div className={styles.card}>
          <h1>{driver.name} {driver.surname || driver.lastname}</h1>
          <p className={styles.title}>ID: </p> <p>{driver.id}</p>
          <p className={styles.title}>Nationality:</p> <p>{driver.nationality}</p>
              <p className={styles.title}>Date of birth:</p><p>{driver.dob.split('T')[0]}</p>

          <p className={styles.title}>Description:</p><p>{driver.description}</p>
          <p className={styles.title}>Teams:</p> <p> {Array.isArray(driver.teams) ? driver.teams.join(', ') : driver.teams}</p>
        </div>
        <Link to={`/home`}>
          <button className={style.button}>Back</button>
        </Link>
      </div>
    );
  } else {
    content = <p>No data found for the driver.</p>;
  }

  return (
    <>
      {content}
    </>
  );
};

export default Detail;