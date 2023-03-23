import Card from "../ui/Card/Card";
import styles from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={styles.home}>
      <h1>Welcome Home</h1>
    </Card>
  );
};

export default Home;
