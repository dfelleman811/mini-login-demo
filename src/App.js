import React, { useState } from "react";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import MainHeader from "./components/main-header/MainHeader";
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // check email and password are valid
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
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
