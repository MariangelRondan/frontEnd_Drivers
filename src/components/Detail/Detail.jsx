import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./detail.module.css"
import defaultImage from './default-image.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getDriverByID } from '../../redux/actions';
import style from "../Cards/cards.module.css"

const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({}); // Modificación 1
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const driverById = useSelector((state) => state.driverById);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDriverByID(id));
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        // Puedes establecer un estado de error si lo deseas
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    // Si driverById cambia, actualiza el estado local
    console.log(driverById);
    setDriver(driverById);
  }, [driverById]);

  let content;

  if (driver.name !== undefined && driver.name !== "") { // Modificación 3
    content = (
      <div className={styles.imageAndDescription}>
        <img src={driver.image === "" ? defaultImage : driver.image} alt={`Image of ${driver.name}`} />
        <div className={styles.card}>
          <h1>{driver.name} {driver.surname || driver.lastname}</h1>
          <p className={styles.title}>ID: </p> <p>{driver.id}</p>
          <p className={styles.title}>Nationality:</p> <p>{driver.nationality}</p>
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
    content = <p>No data found for the driver.</p>;
  }

  return (
    <>
      {content}
    </>
  );
};

export default Detail;