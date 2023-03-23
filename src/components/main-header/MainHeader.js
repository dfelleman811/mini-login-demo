import styles from "./MainHeader.module.css";
import Navigation from "./Navigation";

const MainHeader = (props) => {
  return (
    <header className={styles["main-header"]}>
      <h1>Mini Login Demo App</h1>
      <Navigation
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
    </header>
  );
};

export default MainHeader;
