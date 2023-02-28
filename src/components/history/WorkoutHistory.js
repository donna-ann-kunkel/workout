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
      <Fragment>
        <h2>
          {workoutHistory[reducedWorkoutHistory.indexOf(entry)].workoutDate}
        </h2>
        {Object.entries(entry).map((item) => {
          console.log(item);
          return (
            <Fragment>
              <ul>
                <li>{item[0]}</li>
                {item[1].map((ex) => {
                  return (
                    <Fragment>
                      <li>
                        {ex.reps} reps {ex.weight} {ex.unit}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </Fragment>
    );
  });

  ////////////////////////////////////////////////////

  const filterExerciseHandler = (filteredExercises) => {
    setExerciseFiltered(true);
    setFilteredExercises(filteredExercises);
    console.log(filteredExercises);
  };

  const dateToDisplay = filteredExercises.map((ex) => {
    if (ex.length < 1) {
      return null;
    } else {
      return workoutHistory[filteredExercises.indexOf(ex)].workoutDate;
    }
  });

  console.log(filteredExercises);
  console.log(dateToDisplay);

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
  console.log(reducedFilteredHistory);

  const filteredWorkoutItems = reducedFilteredHistory.map((entry) => {
    return (
      <Fragment>
        <h2>{dateToDisplay[reducedFilteredHistory.indexOf(entry)]}</h2>

        <Fragment>
          {Object.entries(entry).map((item) => {
            return (
              <Fragment>
                <ul>
                  <li>{item[0]}</li>
                  {item[1].map((ex) => {
                    return (
                      <Fragment>
                        <li>
                          {ex.reps} reps {ex.weight} units
                        </li>
                      </Fragment>
                    );
                  })}
                </ul>
              </Fragment>
            );
          })}
        </Fragment>
      </Fragment>
    );
  });

  const dateFilterHandler = (filteredDates) => {
    setDateFiltered(true);
    setFilteredDates(filteredDates);
  };

  const removeDateFilter = () => {
    setDateFiltered(false);
  };
  /////////////////////////////////////////////////////////////////
  console.log(filteredDates);

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
  console.log(reducedDateHistory);

  const filteredDatesDisplay = reducedDateHistory.map((entry) => {
    return (
      <Fragment>
        <h2 className={styles.date}>{filteredDates[0].workoutDate}</h2>
        {Object.entries(entry).map((item) => {
          return (
            <Fragment>
              <ul>
                <li>{item[0]}</li>
                {item[1].map((ex) => {
                  return (
                    <Fragment>
                      <li>
                        {ex.reps} reps {ex.weight} {ex.unit}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </Fragment>
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

      <header className={styles.header}>
        <h1>Filter Exercise History</h1>
        <div>
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
        <div>
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
      </header>
    </Fragment>
  );
};

export default WorkoutHistory;
