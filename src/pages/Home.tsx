import { CreateNote, Navbar } from "../components";
import CardNote from "../components/Note/CardNote";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <CreateNote />
      <CardNote />
    </div>
  );
}
