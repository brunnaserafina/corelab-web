import { useEffect, useState } from "react";
import { CreateNote, Navbar } from "../components";
import CardNote from "../components/Note/CardNote";
import { getFavoriteNotes, getOtherNotes } from "../lib/api";
import INote from "../types/INote";
import styles from "./Home.module.scss";

export default function Home() {
  const [otherNotes, setOtherNotes] = useState<INote[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<INote[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const favoriteNotesData = await getFavoriteNotes();
        const otherNotesData = await getOtherNotes();
        setOtherNotes(otherNotesData);
        setFavoriteNotes(favoriteNotesData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [update]);

  return (
    <div className={styles.Homepage}>
      <Navbar />

      <CreateNote setUpdate={setUpdate} />

      <div className={styles.AllNotes}>
        <h5>Favoritas</h5>
        <div>
          {favoriteNotes.map((note, index) => (
            <CardNote key={index} favorite={true} note={note} />
          ))}
        </div>

        <h5>Outras</h5>
        <div>
          {otherNotes.map((note, index) => (
            <CardNote key={index} favorite={false} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}
