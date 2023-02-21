import { Fragment, useState, useRef, useEffect } from "react";
import HistoryItem from "./HistoryItem";
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

  //Need to work on this reducer to group the exercises by type on history
  console.log(workoutHistory);
  const reducedWorkoutHistory = workoutHistory.map((ex) => {
    return ex.exercises.reduce(
      (prevName, { exerciseName, reps, weight, id }) => {
        (prevName[exerciseName] = prevName[exerciseName] || []).push({
          reps: reps,
          weight: weight,
          id: id,
        });
        console.log(prevName);

        return prevName;
      },
      {}
    );
  });
  console.log(reducedWorkoutHistory);

  console.log(Object.keys(reducedWorkoutHistory[0]));

  const nameArray = Object.keys(reducedWorkoutHistory[0]);

  const workoutItems = workoutHistory.map((ex) => {
    return (
      <Fragment>
        <div className={styles.position}>
          <h2 className={styles.date}>{ex.workoutDate}</h2>
          <ul>
            {ex.exercises.map((item) => {
              return (
                <HistoryItem
                  name={item.exerciseName}
                  weight={item.weight}
                  unit={item.unit}
                  reps={item.reps}
                />
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  });

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

  const filteredWorkoutItems = filteredExercises.map((entry) => {
    console.log(filteredExercises.indexOf(entry));
    return (
      <Fragment>
        <ul>
          {entry.map((ex) => {
            return (
              <Fragment>
                <h2 className={styles.date}>
                  {dateToDisplay[filteredExercises.indexOf(entry)]}
                </h2>
                <HistoryItem
                  name={ex.exerciseName}
                  weight={ex.weight}
                  unit={ex.unit}
                  reps={ex.reps}
                />
              </Fragment>
            );
          })}
        </ul>
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

  const filteredDatesDisplay = filteredDates.map((item) => {
    return item.exercises.map((ex) => {
      return (
        <Fragment>
          <h2 className={styles.date}>{filteredDates[0].workoutDate}</h2>
          <HistoryItem
            name={ex.exerciseName}
            weight={ex.weight}
            unit={ex.unit}
            reps={ex.reps}
          />
        </Fragment>
      );
    });
  });

  const removeBodyFilter = () => {
    setExerciseFiltered(false);
  };

  return (
    <Fragment>
      {!isExerciseFiltered && !isDateFiltered && workoutItems}
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
