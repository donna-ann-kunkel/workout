import { useRef, Fragment } from "react";
import styles from "./WorkoutHistory.module.css";

const DateFilter = (props) => {
  console.log(props.workoutHistory);
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

    console.log(inputMonth);

    const filteredDates = props.workoutHistory.filter(
      (ex) =>
        new Date(ex.workoutDate).getYear() === inputYear &&
        new Date(ex.workoutDate).getMonth() === inputMonth
    );
    console.log(filteredDates);
    props.onDateFilter(filteredDates);
  };
  return (
    <Fragment>
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        ref={refSelectDate}
        onChange={dateFilterHandler}
      />
    </Fragment>
  );
};
export default DateFilter;
