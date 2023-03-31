import { useState, useEffect } from "react";

import Button from "../ui/Button/Button";
import Card from "../ui/Card/Card";

import styles from "./Login.module.css";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // by passing dependencies to use effect, we ensure it's only run when one of those dependencies changes (React guarantees that any setXXX function from useState will never change)
  // checking the validity of user input after a change can be considered a sideEffect - a side effect of the user entering data
  // whenever you have an action that should be executed in response to another action - that IS a side effect - and where useEffect comes in
  useEffect(() => {
    const checkValidityTimer = setTimeout(()=>{
      console.log('Checking validity.');
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 7
      );
    }, 500)
    
    // useEffect can return -> this is called a cleanup function - will run as a cleanup process before useEffect runs again. (It will only not run the very first time the compenent is rendered).
    return () => {
      console.log("CLEANUP");
      clearTimeout(checkValidityTimer); // as long as the user keeps typing, the timer will clear and restart (unless user pauses in typing for more than 1 second)
    };

  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 7);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onLogin(enteredEmail, enteredPassword);

    // reset form
    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
