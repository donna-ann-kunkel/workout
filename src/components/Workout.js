import React, { useEffect } from "react";
import { useState } from "react";
import WorkoutItem from "./WorkoutItem";
const Workout = () => {
  const [exercises, setExercises] = useState([]);

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
        });
      }
      setExercises(exerciseArray);
    };

    fetchExercises();
  }, []);

  console.log(exercises);
  const exerciseList = exercises.map((ex) => (
    <WorkoutItem key={ex.id} id={ex.id} name={ex.name} />
  ));

  return <ul>{exerciseList}</ul>;
};

export default Workout;
