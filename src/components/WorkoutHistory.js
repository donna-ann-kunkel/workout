import { Fragment, useState, useRef } from "react";
import HistoryItem from "./HistoryItem";
import styles from "./WorkoutHistory.module.css";

const WorkoutHistory = (props) => {
  const [isExerciseFiltered, setExerciseFiltered] = useState(false);
  const refSelectExercise = useRef("bicep curl");

  const dummyData = {
    id: "012345",
    exerciseData: [
      {
        workoutId: 1,

        workoutDate: "1 / 1 / 2020",
        exercises: [
          {
            name: "bicep curl",
            weight: 10,
            unit: "lb",
            reps: 10,
          },
          { name: "bicep curl", weight: 15, unit: "lb", reps: 15 },
          { name: "front lunge", weight: 25, unit: "lb", reps: 15 },
          { name: "reverse lunge", weight: 25, unit: "lb", reps: 15 },
          { name: "squat", weight: 25, unit: "lb", reps: 15 },
        ],
      },

      {
        workoutId: 2,
        workoutDate: "1 / 2 / 2020",
        exercises: [
          {
            name: "bicep curl",
            weight: 10,
            unit: "lb",
            reps: 10,
          },
          { name: "bicep curl", weight: 15, unit: "lb", reps: 15 },
          { name: "front lunge", weight: 25, unit: "lb", reps: 15 },
          { name: "reverse lunge", weight: 25, unit: "lb", reps: 15 },
          { name: "squat", weight: 25, unit: "lb", reps: 15 },
        ],
      },
      {
        workoutId: 3,
        workoutDate: "1 / 4 / 2020",
        exercises: [
          {
            name: "bicep curl",
            weight: 10,
            unit: "lb",
            reps: 10,
          },
          { name: "bicep curl", weight: 15, unit: "lb", reps: 15 },
          { name: "front lunge", weight: 25, unit: "lb", reps: 15 },
          { name: "deadlift", weight: 65, unit: "lb", reps: 15 },
          { name: "deadlift", weight: 65, unit: "lb", reps: 10 },
          { name: "deadlift", weight: 65, unit: "lb", reps: 10 },
          { name: "squat", weight: 55, unit: "lb", reps: 15 },
          { name: "squat", weight: 65, unit: "lb", reps: 15 },
          { name: "squat", weight: 75, unit: "lb", reps: 15 },
        ],
      },
    ],
  };

  const workoutItems = dummyData.exerciseData.map((ex) => {
    return (
      <Fragment>
        <div className={styles.position}>
          <h2 className={styles.date}>{ex.workoutDate}</h2>
          <ul>
            {ex.exercises.map((item) => {
              return (
                <HistoryItem
                  name={item.name}
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

  const filteredWorkoutItems = dummyData.exerciseData.map((ex) => {
    return (
      <Fragment>
        <div className={styles.position}>
          <h2 className={styles.date}>{ex.workoutDate}</h2>
          <ul>
            {ex.exercises
              .filter((item) => {
                return item.name === refSelectExercise.current.value;
              })
              .map((item) => {
                return (
                  <HistoryItem
                    name={item.name}
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
