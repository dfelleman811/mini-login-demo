import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import MainHeader from "./components/main-header/MainHeader";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // we could try to check for the local storage everytime the component rerenders
  // // but this will cause an infinite loop - so we need to implement useEffect()
  // const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  // if (storedUserLoggedInInformation === '1') {
  //   setIsLoggedIn(true)
  // };

  // we use useEffect because the function we pass in as arg 1 is invoked AFTER every component reevalutation (after the component function runs)
  // the component will rerun again
  // N.B. it will ONLY run if the listed dependencies are changed
  // with no listed dependencies this will run once and only once (when our app starts up)
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // check email and password are valid
    localStorage.setItem("isLoggedIn", "1"); // 1 = logged in (true); 0 = logged in (false)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader
        isAuthenticated={isLoggedIn}
        onLogout={logoutHandler}
      ></MainHeader>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}></Login>}
        {isLoggedIn && <Home onLogout={logoutHandler}></Home>}
      </main>
    </React.Fragment>
  );
}

export default App;
