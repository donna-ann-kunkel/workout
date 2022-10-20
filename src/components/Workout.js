import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import WorkoutItem from "./WorkoutItem";
import styles from "./Workout.module.css";

const Workout = () => {
  const [exercises, setExercises] = useState([]);
  const [legsFilter, setLegsFilter] = useState(false);
  const [armsFilter, setArmsFilter] = useState(false);
  const [coreFilter, setCoreFilter] = useState(false);
  const [backFilter, setBackFilter] = useState(false);
  const [chestFilter, setChestFilter] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch(
        "https://udemy-react-http-d7691-default-rtdb.firebaseio.com/excercises.json"
      );

      const exerciseData = await response.json();

      const exerciseArray = [];
      for (const key in exerciseData) {
        exerciseArray.push({
          id: key,
          name: exerciseData[key].name,
          body: exerciseData[key].body,
        });
      }
      setExercises(exerciseArray);
    };

    fetchExercises();
  }, []);

  const fullExerciseList = exercises.slice();
  let displayExerciseList = exercises.slice();

  const filterLegHandler = () => {
    setLegsFilter(true);
    setArmsFilter(false);
    setCoreFilter(false);
    setBackFilter(false);
    setChestFilter(false);
  };
  const filterCoreHandler = () => {
    setCoreFilter(true);
    setLegsFilter(false);
    setArmsFilter(false);
    setBackFilter(false);
    setChestFilter(false);
  };

  const filteredArmsHandler = () => {
    setLegsFilter(false);
    setArmsFilter(true);
    setCoreFilter(false);
    setBackFilter(false);
    setChestFilter(false);
  };
  const filterBackHandler = () => {
    setBackFilter(true);
    setLegsFilter(false);
    setArmsFilter(false);
    setCoreFilter(false);
    setChestFilter(false);
  };
  const filterChestHandler = () => {
    setBackFilter(false);
    setLegsFilter(false);
    setArmsFilter(false);
    setCoreFilter(false);
    setChestFilter(true);
  };

  let workoutItems = displayExerciseList.map((ex) => (
    <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />
  ));

  const filteredLegs = fullExerciseList
    .filter((ex) => {
      return ex.body === "legs";
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);

  const filteredArms = fullExerciseList
    .filter((ex) => {
      return ex.body === "arms";
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);

  const filteredCore = fullExerciseList
    .filter((ex) => {
      return ex.body === "core";
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);
  const filteredBack = fullExerciseList
    .filter((ex) => {
      return ex.body === "back";
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);
  const filteredChest = fullExerciseList
    .filter((ex) => {
      return ex.body === "chest";
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Select Exercises</h1>
        <button className={styles.button} onClick={filterLegHandler}>
          Legs
        </button>
        <button className={styles.button} onClick={filteredArmsHandler}>
          Arms
        </button>
        <button className={styles.button} onClick={filterBackHandler}>
          Back
        </button>
        <button className={styles.button} onClick={filterCoreHandler}>
          Core
        </button>
        <button className={styles.button} onClick={filterChestHandler}>
          Chest
        </button>
      </header>
      <ul className={styles.exerciseList}>
        {!legsFilter &&
          !armsFilter &&
          !coreFilter &&
          !backFilter &&
          !chestFilter &&
          workoutItems}
        {armsFilter && filteredArms}
        {coreFilter && filteredCore}
        {legsFilter && filteredLegs}
        {chestFilter && filteredChest}
        {backFilter && filteredBack}
      </ul>
    </Fragment>
  );
};

export default Workout;
