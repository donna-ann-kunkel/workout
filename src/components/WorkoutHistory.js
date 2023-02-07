import { Fragment, useState, useRef, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import styles from "./WorkoutHistory.module.css";

const WorkoutHistory = (props) => {
  const [isExerciseFiltered, setExerciseFiltered] = useState(false);
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

  return (
    <Fragment>
      {!isExerciseFiltered && workoutItems}
      {isExerciseFiltered && filteredWorkoutItems}
      <header className={styles.header}>
        <h1>Filter Exercise History</h1>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" />
        <label htmlFor="exercise">Exercise Name</label>
        <select
          name="exercise"
          id="exercise"
          onChange={filterExerciseHandler}
          ref={refSelectExercise}
        >
          <option value="bicep curl">Bicep Curls</option>
          <option value="tricep kickback">Tricep Kickback</option>
          <option value="chest press">Chest Press</option>
          <option value="squat">Squat</option>
          <option value="deadlift">Deadlift</option>
        </select>
      </header>
    </Fragment>
  );
};

export default WorkoutHistory;
