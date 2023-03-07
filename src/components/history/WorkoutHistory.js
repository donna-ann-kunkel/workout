import { Fragment, useState, useRef, useEffect } from "react";

import styles from "./WorkoutHistory.module.css";
import DateFilter from "./DateFilter";
import { AiOutlineClose } from "react-icons/ai";
import ExerciseFilter from "./ExerciseFilter";

const WorkoutHistory = (props) => {
  const [isExerciseFiltered, setExerciseFiltered] = useState(false);
  const [isDateFiltered, setDateFiltered] = useState(false);
  const [filteredDates, setFilteredDates] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([
    {
      workoutId: "",
      workoutDate: "",
      exercises: [
        {
          name: "",
          weight: 0,
          unit: "",
          reps: 0,
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch(
        "https://udemy-react-http-d7691-default-rtdb.firebaseio.com/userExercise.json"
      );

      const userExerciseData = await response.json();

      const exerciseArray = [];
      for (const key in userExerciseData) {
        exerciseArray.push({
          workoutId: key,
          workoutDate: userExerciseData[key].exerciseData[0].date,
          exercises: userExerciseData[key].exerciseData[0].exercise,
        });
      }
      setWorkoutHistory(exerciseArray);
    };

    fetchExercises();
  }, []);
  ///////////////////////////////////////////////////////

  const reducedWorkoutHistory = workoutHistory.map((ex) => {
    return ex.exercises.reduce(
      (prevName, { exerciseName, reps, weight, id, unit }) => {
        (prevName[exerciseName] = prevName[exerciseName] || []).push({
          reps: reps,
          weight: weight,
          id: id,
          unit: unit,
        });

        return prevName;
      },
      {}
    );
  });

  const reducedDisplay = reducedWorkoutHistory.map((entry) => {
    return (
      <div className={styles.list}>
        <h2>
          {workoutHistory[reducedWorkoutHistory.indexOf(entry)].workoutDate}
        </h2>
        {Object.entries(entry).map((item) => {
          return (
            <Fragment>
              <ul className={styles.grid3}>
                <li className={styles.exerciseName}>{item[0]}</li>
                {item[1].map((ex) => {
                  return (
                    <Fragment>
                      <li className={styles.exerciseDetails}>
                        {ex.reps} reps - {ex.weight} {ex.unit}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </div>
    );
  });

  ////////////////////////////////////////////////////

  const filterExerciseHandler = (filteredExercises) => {
    setExerciseFiltered(true);
    setDateFiltered(false);
    setFilteredExercises(filteredExercises);
  };

  const dateToDisplay = filteredExercises.map((ex) => {
    if (ex.length < 1) {
      return null;
    } else {
      return workoutHistory[filteredExercises.indexOf(ex)].workoutDate;
    }
  });

  const reducedFilteredHistory = filteredExercises.map((ex) => {
    return ex.reduce((prevName, { exerciseName, reps, weight, id, unit }) => {
      (prevName[exerciseName] = prevName[exerciseName] || []).push({
        reps: reps,
        weight: weight,
        id: id,
        unit: unit,
      });

      return prevName;
    }, {});
  });

  const filteredWorkoutItems = reducedFilteredHistory.map((entry) => {
    //this if statement prevents empty boxes from being displayed
    if (Object.keys(entry).length > 0) {
      return (
        <div className={styles.list}>
          <h2>{dateToDisplay[reducedFilteredHistory.indexOf(entry)]}</h2>

          <Fragment>
            {Object.entries(entry).map((item) => {
              return (
                <Fragment>
                  <ul className={styles.grid3}>
                    <li className={styles.exerciseName}>{item[0]}</li>
                    {item[1].map((ex) => {
                      return (
                        <Fragment>
                          <li className={styles.exerciseDetails}>
                            {ex.reps} reps - {ex.weight} {ex.unit}
                          </li>
                        </Fragment>
                      );
                    })}
                  </ul>
                </Fragment>
              );
            })}
          </Fragment>
        </div>
      );
    }
  });

  const dateFilterHandler = (filteredDates) => {
    setDateFiltered(true);
    setExerciseFiltered(false);
    setFilteredDates(filteredDates);
  };

  const removeDateFilter = () => {
    setDateFiltered(false);
  };
  /////////////////////////////////////////////////////////////////

  const reducedDateHistory = filteredDates.map((ex) => {
    return ex.exercises.reduce(
      (prevName, { exerciseName, reps, weight, id, unit }) => {
        (prevName[exerciseName] = prevName[exerciseName] || []).push({
          reps: reps,
          weight: weight,
          id: id,
          unit: unit,
        });

        return prevName;
      },
      {}
    );
  });

  const filteredDatesDisplay = reducedDateHistory.map((entry) => {
    return (
      <div className={styles.list}>
        <h2 className={styles.date}>{filteredDates[0].workoutDate}</h2>
        {Object.entries(entry).map((item) => {
          return (
            <Fragment>
              <ul>
                <li className={styles.exerciseName}>{item[0]}</li>
                {item[1].map((ex) => {
                  return (
                    <Fragment>
                      <li className={styles.exerciseDetails}>
                        {ex.reps} reps {ex.weight} {ex.unit}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </div>
    );
  });

  const removeBodyFilter = () => {
    setExerciseFiltered(false);
  };

  return (
    <Fragment>
      {!isExerciseFiltered && !isDateFiltered && reducedDisplay}
      {isExerciseFiltered && !isDateFiltered && filteredWorkoutItems}
      {isDateFiltered && filteredDatesDisplay}

      <footer className={styles.footer}>
        <h1 className={styles.footerTitle}>Filter History</h1>
        <div className={styles.footerSection}>
          <DateFilter
            workoutHistory={workoutHistory}
            onDateFilter={dateFilterHandler}
          />
          <button className={styles.button} onClick={removeDateFilter}>
            <AiOutlineClose
              className={styles.icon}
              onClick={removeDateFilter}
            />
          </button>
        </div>
        <div className={styles.footerSection}>
          <ExerciseFilter
            workoutHistory={workoutHistory}
            onExerciseFilter={filterExerciseHandler}
          />

          <button className={styles.button}>
            <AiOutlineClose
              className={styles.icon}
              onClick={removeBodyFilter}
            />
          </button>
        </div>
      </footer>
    </Fragment>
  );
};

export default WorkoutHistory;
