import { Fragment, useRef } from "react";

const ExerciseFilter = (props) => {
  const refSelectExercise = useRef("");

  const filterExerciseHandler = () => {
    console.log(props.workoutHistory);
    //need to figure out how to keep the date when filtering

    const filteredExercises = props.workoutHistory.map((ex) => {
      return ex.exercises.filter((item) => {
        return item.exerciseName === refSelectExercise.current.value;
      });
    });
    props.onExerciseFilter(filteredExercises);
    console.log(filteredExercises);
  };

  return (
    <Fragment>
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
        <option value="Leg Press">Leg Press</option>
        <option value="Tricep Kickbacks">Tricep Kickback</option>
        <option value="Reverse Lunges">Reverse Lunges</option>
        <option value="Overhead Press">Overhead Press</option>
      </select>
    </Fragment>
  );
};

export default ExerciseFilter;
