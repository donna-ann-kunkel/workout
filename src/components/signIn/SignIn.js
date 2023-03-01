import { Fragment } from "react";
import {
  AiOutlineGoogle,
  AiOutlineFacebook,
  AiOutlineApple,
} from "react-icons/ai";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const googleLoginHandler = () => {
    console.log("GOOGLE!");
  };

  const facebookLoginHandler = () => {
    console.log("FACEBOOK!");
  };

  const appleLoginHandler = () => {
    console.log("APPLE");
  };

  return (
    <Fragment>
      <p>SIGN IN PAGE</p>
      <div className={styles.logIn}>
        <button className={styles.logInButton} onClick={googleLoginHandler}>
          <AiOutlineGoogle />
          Log in with Google
        </button>
        <button className={styles.logInButton} onClick={facebookLoginHandler}>
          <AiOutlineFacebook />
          Log in with Facebook
        </button>
        <button className={styles.logInButton} onClick={appleLoginHandler}>
          <AiOutlineApple />
          Log in with Apple
        </button>
      </div>
    </Fragment>
  );
};

export default SignIn;
