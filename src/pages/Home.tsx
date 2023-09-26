import { CreateNote, Navbar } from "../components";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <CreateNote />
    </div>
  );
}
