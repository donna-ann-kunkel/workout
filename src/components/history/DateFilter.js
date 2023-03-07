import { useRef, Fragment } from "react";
import styles from "./DateFilter.module.css";

const DateFilter = (props) => {
  const refSelectDate = useRef("");

  // issue is workoutDay is showing up one day off??????? no idea why

  // && workoutDay === inputDay

  //issue is that filtered dates isn't available here(stuck in function scope).... maybe pass up as props?
  //can maybe change syntax so that we return the array??

  const dateFilterHandler = () => {
    const inputMonth = new Date(refSelectDate.current.value).getUTCMonth();
    const inputYear = new Date(refSelectDate.current.value).getUTCFullYear();
    const inputDay = new Date(refSelectDate.current.value).getUTCDate();
    console.log(inputDay);
    console.log(props.workoutHistory);

    const filteredDates = props.workoutHistory.filter(
      (ex) =>
        new Date(ex.workoutDate).getUTCFullYear() === inputYear &&
        new Date(ex.workoutDate).getUTCMonth() === inputMonth &&
        new Date(ex.workoutDate).getUTCDate() === inputDay
    );

    props.onDateFilter(filteredDates);
  };
  return (
    <div className={styles.container}>
      <label htmlFor="date">Date</label>
      <input
        className={styles.input}
        id="date"
        type="date"
        ref={refSelectDate}
        onChange={dateFilterHandler}
      />
    </div>
  );
};
export default DateFilter;
