import { useRef, useState } from "react";
import { HeaderNote } from "../../../components";
import { postNote } from "../../../lib/api";
import INote from "../../../types/INote";
import styles from "./CreateNote.module.scss";

interface CreateNoteProps {
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNote(props: CreateNoteProps) {
  const initialNoteState: INote = {
    title: "",
    content: "",
    favorite: false,
    color: "#ffffff",
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [note, setNote] = useState<INote>(initialNoteState);
  const [favorite, setFavorite] = useState<boolean>(note.favorite);

  async function handleCreateNote() {
    try {
      await postNote(note);
      setNote(initialNoteState);
      setFavorite(false);
      props.setUpdate((update) => !update);
      if (textareaRef.current) textareaRef.current.style.height = "15px";
    } catch (err) {
      console.log("Não foi possível criar a nota. Tente novamente.");
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    //adapt textarea height
    const textarea = e.target;
    textarea.style.height = "15px";
    const scHeight = textarea.scrollHeight;
    textarea.style.height = `${scHeight}px`;

    setNote({ ...note, content: textarea.value });
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (e.currentTarget.innerHTML) {
        handleCreateNote();
      }
    }
  }

  return (
    <div className={styles.CreateNote}>
      <HeaderNote
        disabledInput={false}
        note={note}
        setNote={setNote}
        setUpdate={props.setUpdate}
        favorite={favorite}
        setFavorite={setFavorite}
      />

      <div className={styles.WriteNote}>
        <textarea
          aria-label="Campo para criar  nota"
          placeholder="Criar nota..."
          value={note.content}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
          minLength={1}
          required
        />
      </div>
    </div>
  );
}
