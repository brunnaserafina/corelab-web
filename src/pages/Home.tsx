import { CreateNote, Navbar } from "../components";
import CardNote from "../components/Note/CardNote";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.Homepage}>
      <Navbar />

      <CreateNote />

      <div className={styles.AllNotes}>
        <h5>Favoritas</h5>
        <div>
          <CardNote />
          <CardNote />
          <CardNote />

        </div>

        <h5>Outras</h5>
        <div>
          <CardNote />
          <CardNote />
          <CardNote />
          <CardNote />
        </div>
      </div>
    </div>
  );
}
