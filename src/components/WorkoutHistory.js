import { Fragment, useState, useRef, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import styles from "./WorkoutHistory.module.css";
import DateFilter from "./DateFilter";

const WorkoutHistory = (props) => {
  const [isExerciseFiltered, setExerciseFiltered] = useState(false);
  const [isDateFiltered, setDateFiltered] = useState(false);
  const [filteredDates, setFilteredDates] = useState([]);
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
  const refSelectExercise = useRef("");

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

  console.log(workoutHistory);

  //Need to work on this reducer to group the exercises by type on history
  // const reducedWorkoutHistory = workoutHistory
  //   .map((item) => {
  //     return item.exercises;
  //   })
  //   .reduce((prevName, { exerciseName, reps, weight }) => {
  //     (prevName[exerciseName] = prevName[exerciseName] || []).push({
  //       reps: reps,
  //       weight: weight,
  //     });
  //     return prevName;
  //   }, {});
  // console.log(reducedWorkoutHistory);
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

  const filterExerciseHandler = () => {
    setExerciseFiltered(true);
  };

  const filteredWorkoutItems = workoutHistory.map((ex) => {
    return (
      <Fragment>
        <div className={styles.position}>
          <h2 className={styles.date}>{ex.workoutDate}</h2>
          <ul>
            {ex.exercises
              .filter((item) => {
                return item.exerciseName === refSelectExercise.current.value;
              })
              .map((item) => {
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

  const dateFilterHandler = (filteredDates) => {
    setDateFiltered(true);
    setFilteredDates(filteredDates);

    console.log(isDateFiltered);
  };

  const filteredDatesDisplay = filteredDates.map((item) => {
    console.log(filteredDates[0].workoutDate);
    return item.exercises.map((ex) => {
      return (
        <Fragment>
          <h2 className={styles.heading}>{filteredDates[0].workoutDate}</h2>
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

  return (
    <Fragment>
      {!isExerciseFiltered && !isDateFiltered && workoutItems}
      {isExerciseFiltered && !isDateFiltered && filteredWorkoutItems}
      {isDateFiltered && filteredDatesDisplay}

      <header className={styles.header}>
        <h1>Filter Exercise History</h1>
        <DateFilter
          workoutHistory={workoutHistory}
          onDateFilter={dateFilterHandler}
        />
        <label htmlFor="exercise">Exercise Name</label>
        <select
          name="exercise"
          id="exercise"
          onChange={filterExerciseHandler}
          ref={refSelectExercise}
        >
          <option value="Bicep Curl">Bicep Curls</option>
          <option value="Tricep Kickback">Tricep Kickback</option>
          <option value="Chest Press">Chest Press</option>
          <option value="Chest Fly">Chest Fly</option>
          <option value="Squat">Squat</option>
          <option value="Dead Lift">Dead Lift</option>
        </select>
      </header>
    </Fragment>
  );
};

export default WorkoutHistory;
