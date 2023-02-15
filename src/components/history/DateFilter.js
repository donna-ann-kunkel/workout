import { useRef, Fragment } from "react";
import styles from "./DateFilter.module.css";

const DateFilter = (props) => {
  const refSelectDate = useRef("");

  // issue is workoutDay is showing up one day off??????? no idea why

  // && workoutDay === inputDay

  //issue is that filtered dates isn't available here(stuck in function scope).... maybe pass up as props?
  //can maybe change syntax so that we return the array??

  const dateFilterHandler = () => {
    // setDateFiltered(true);

    const inputMonth = new Date(refSelectDate.current.value).getMonth();
    const inputYear = new Date(refSelectDate.current.value).getYear();
    const inputDay = new Date(refSelectDate.current.value).getDate();

    const filteredDates = props.workoutHistory.filter(
      (ex) =>
        new Date(ex.workoutDate).getYear() === inputYear &&
        new Date(ex.workoutDate).getMonth() === inputMonth
    );

    props.onDateFilter(filteredDates);
  };
  return (
    <Fragment>
      <label htmlFor="date">Date</label>
      <input
        className={styles.input}
        id="date"
        type="date"
        ref={refSelectDate}
        onChange={dateFilterHandler}
      />
    </Fragment>
  );
};
export default DateFilter;
