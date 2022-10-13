import { Fragment } from "react";
import styles from "./Modal.module.css";
import { ReactDOM } from "react-dom";

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");

  return (
    <Fragment>
      <div className={styles.backdrop}></div>,
      <div className={styles.modal}>
        <div>
          <div>
            <h3>Bicep Curl</h3>
            <div>15 lb 10 reps</div>
            <button>Edit</button>
            <div>10 lb 5 reps</div>
            <button>Edit</button>
          </div>

          <div>
            <h3>Forward Lunges</h3>
            <div>15 lb 10 reps</div>
            <button>Edit</button>
          </div>
        </div>

        <button onClick={props.onClose}>Close</button>
        <button>Complete Workout</button>
      </div>
      ,
    </Fragment>
  );
};
export default Modal;
