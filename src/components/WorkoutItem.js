import styles from "./WorkoutItem.module.css";

const WorkoutItem = (props) => {
  return (
    <li className={styles.list}>
      <div>
        <h3>{props.name}</h3>
        <form>
          <div className={styles.input}>
            <label htmlFor="repNumber"># of Reps</label>
            <input id="repNumber" type="number" />
            <label htmlFor="weight">Weight</label>
            <input id="weight" type="number" />
            <button>Add to Workout</button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default WorkoutItem;
