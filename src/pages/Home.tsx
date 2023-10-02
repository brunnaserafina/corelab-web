import { useCallback, useEffect, useState } from "react";
import { Navbar, CardNote, CreateNote, colors } from "../components";
import { getFavoriteNotes, getOtherNotes } from "../lib/api";
import INote from "../types/INote";
import styles from "./Home.module.scss";

export default function Home() {
  const [otherNotes, setOtherNotes] = useState<INote[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<INote[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);

  const filterNotes = useCallback(
    (notesData: INote[]) => {
      return notesData.filter((note: INote) => {
        //searches for the name of the color searched for in the website's color palette
        const colorMatch = colors.filter((color) =>
          color.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        return (
          colorMatch.some(
            (color) => note.color.toLowerCase() === color.code.toLowerCase(),
          ) ||
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    },
    [searchTerm],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const favoriteNotesData = await getFavoriteNotes();
        const otherNotesData = await getOtherNotes();

        if (searchTerm.length > 0) {
          setFavoriteNotes(filterNotes(favoriteNotesData));
          setOtherNotes(filterNotes(otherNotesData));
        } else {
          setFavoriteNotes(favoriteNotesData);
          setOtherNotes(otherNotesData);
        }
      } catch (err) {
        console.log(
          "Não foi possível carregar as notas. Recarrege a página e tente novamente.",
        );
      }
    }
    fetchData();
  }, [searchTerm, filterNotes, update]);

  return (
    <div className={styles.Homepage}>
      <Navbar onSearchChange={setSearchTerm} />

      <CreateNote setUpdate={setUpdate} />

      <div className={styles.AllNotes}>
        {favoriteNotes.length > 0 && (
          <>
            <h5>Favoritas</h5>
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
          </>
        )}

        {otherNotes.length > 0 && (
          <>
            <h5>Outras</h5>
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
          </>
        )}
      </div>
    </div>
  );
}
