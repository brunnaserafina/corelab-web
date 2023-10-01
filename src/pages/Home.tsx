import { useEffect, useState } from "react";
import { CreateNote, Navbar } from "../components";
import CardNote from "../components/Note/CardNote";
import { getFavoriteNotes, getOtherNotes } from "../lib/api";
import INote from "../types/INote";
import { colors } from "../utils/colors";
import styles from "./Home.module.scss";

export default function Home() {
  const [otherNotes, setOtherNotes] = useState<INote[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<INote[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const favoriteNotesData = await getFavoriteNotes();
        const otherNotesData = await getOtherNotes();

        const colorMatch = colors.filter((color) =>
          color.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        const filterFavoriteNotes = favoriteNotesData.filter(
          (note: INote) =>
            colorMatch.some(
              (color) => note.color.toLowerCase() === color.code.toLowerCase(),
            ) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        const filterOtherNotes = otherNotesData.filter(
          (note: INote) =>
            colorMatch.some(
              (color) => note.color.toLowerCase() === color.code.toLowerCase(),
            ) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        setFavoriteNotes(filterFavoriteNotes);
        setOtherNotes(filterOtherNotes);

        if (searchTerm.length === 0) {
          setFavoriteNotes(favoriteNotesData);
          setOtherNotes(otherNotesData);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [update, searchTerm]);

  return (
    <div className={styles.Homepage}>
      <Navbar onSearchChange={setSearchTerm} />

      <CreateNote setUpdate={setUpdate} />

      <div className={styles.AllNotes}>
        {favoriteNotes.length > 0 && <h5>Favoritas</h5>}
        <div>
          {favoriteNotes.map((note) => (
            <CardNote
              key={note.id}
              favorite={true}
              note={note}
              setUpdate={setUpdate}
            />
          ))}
        </div>

        {otherNotes.length > 0 && <h5>Outras</h5>}
        <div>
          {otherNotes.map((note) => (
            <CardNote
              key={note.id}
              favorite={false}
              note={note}
              setUpdate={setUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
