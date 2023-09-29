import { useRef, useState } from "react";
import { postNote } from "../../../lib/api";
import INote from "../../../types/INote";
import HeaderNote from "../HeaderNote";
import styles from "./CreateNote.module.scss";

interface CreateNoteProps {
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNote(props: CreateNoteProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [note, setNote] = useState<INote>({
    title: "",
    content: "",
    favorite: false,
    color: "#ffffff", //default color
  });

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

      try {
        await postNote(note);
        setNote({
          title: "",
          content: "",
          color: "#ffffff",
          favorite: false,
        });
        props.setUpdate((update) => !update);

        if (textareaRef.current) {
          textareaRef.current.style.height = "15px";
        }
      } catch (err) {
        console.error(err);
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
      />

      <div className={styles.WriteNote}>
        <textarea
          placeholder="Criar nota..."
          value={note.content}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
      </div>
    </div>
  );
}
