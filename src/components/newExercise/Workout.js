import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import WorkoutItem from "./WorkoutItem";
import styles from "./Workout.module.css";

import Search from "./Search";

const Workout = () => {
  const [exercises, setExercises] = useState([]);
  const [legsFilter, setLegsFilter] = useState(false);
  const [armsFilter, setArmsFilter] = useState(false);
  const [coreFilter, setCoreFilter] = useState(false);
  const [backFilter, setBackFilter] = useState(false);
  const [chestFilter, setChestFilter] = useState(false);
  const [glutesFilter, setGlutesFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
    setGlutesFilter(false);
    closeFiltersHandler();
  };
  const filterCoreHandler = () => {
    setCoreFilter(true);
    setLegsFilter(false);
    setArmsFilter(false);
    setBackFilter(false);
    setChestFilter(false);
    setGlutesFilter(false);
    closeFiltersHandler();
  };

  const filteredArmsHandler = () => {
    setLegsFilter(false);
    setArmsFilter(true);
    setCoreFilter(false);
    setBackFilter(false);
    setChestFilter(false);
    setGlutesFilter(false);
    closeFiltersHandler();
  };
  const filterBackHandler = () => {
    setBackFilter(true);
    setLegsFilter(false);
    setArmsFilter(false);
    setCoreFilter(false);
    setChestFilter(false);
    setGlutesFilter(false);
    closeFiltersHandler();
  };
  const filterChestHandler = () => {
    setBackFilter(false);
    setLegsFilter(false);
    setArmsFilter(false);
    setCoreFilter(false);
    setChestFilter(true);
    setGlutesFilter(false);
    closeFiltersHandler();
  };
  const filterGlutesHandler = () => {
    setBackFilter(false);
    setLegsFilter(false);
    setArmsFilter(false);
    setCoreFilter(false);
    setChestFilter(false);
    setGlutesFilter(true);
    closeFiltersHandler();
  };

  const closeFiltersHandler = () => {
    setShowFilters(false);
  };

  const showFilterHandler = () => {
    setShowFilters(true);
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
  const filteredGlutes = fullExerciseList
    .filter((ex) => {
      return ex.body === "glutes";
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    setIsSearching(true);
  };

  const filteredSearch = fullExerciseList
    .filter((ex) => {
      return ex.name.includes(searchTerm);
    })
    .map((ex) => <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />);

  return (
    <Fragment>
      <ul className={styles.exerciseList}>
        {!legsFilter &&
          !armsFilter &&
          !coreFilter &&
          !backFilter &&
          !chestFilter &&
          !glutesFilter &&
          !isSearching &&
          workoutItems}
        {armsFilter && filteredArms}
        {coreFilter && filteredCore}
        {legsFilter && filteredLegs}
        {chestFilter && filteredChest}
        {backFilter && filteredBack}
        {glutesFilter && filteredGlutes}
        {isSearching && filteredSearch}
      </ul>
      <footer className={styles.header}>
        <h1>Select Exercises</h1>
        <Search onSearch={searchHandler} />
        <button className={styles.button} onClick={showFilterHandler}>
          Filter by body part
        </button>
        {showFilters && (
          <div className={styles.menu}>
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
            <button className={styles.button} onClick={filterGlutesHandler}>
              Glutes
            </button>
          </div>
        )}
      </footer>
    </Fragment>
  );
};

export default Workout;
