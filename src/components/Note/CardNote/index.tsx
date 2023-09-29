import { useRef, useState } from "react";
import HeaderNote from "../HeaderNote";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import INote from "../../../types/INote";
import { deleteNote, editColorNote, editNote } from "../../../lib/api";

interface CardNoteProps {
  note: INote;
  favorite: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const colors = [
  { code: "#bae2ff", name: "Azul claro" },
  { code: "#b9ffdd", name: "Creme de Hortelã" },
  { code: "#ffe8ac", name: "Champanhe" },
  { code: "#ffcab9", name: "Pêssego" },
  { code: "#f99494", name: "Salmão Claro" },
  { code: "#eca1ff", name: "Lavanda" },
  { code: "#daff8b", name: "Verde Neon" },
  { code: "#ffa285", name: "Melão" },
  { code: "#cdcdcd", name: "Cinza Claro" },
  { code: "#979797", name: "Cinza" },
  { code: "#a99a7c", name: "Caqui" },
];

export default function CardNote(props: CardNoteProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [showPallete, setShowPallete] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [note, setNote] = useState<INote>({
    id: props.note?.id,
    title: props.note?.title,
    content: props.note?.content,
    favorite: props.favorite,
    color: props.note?.color,
  });

  async function handleDeleteNote() {
    if (
      window.confirm("Tem certeza que deseja deletar essa nota?") &&
      props.note.id
    ) {
      await deleteNote(props.note.id);
      props.setUpdate((update: boolean) => !update);
    }
  }

  async function handleEditColorNote(color: string) {
    const updatedNote = { ...props.note, color };
    setNote(updatedNote);
    setShowPallete(false);

    try {
      if (props.note.id) {
        await editColorNote(props.note.id, updatedNote);
        props.setUpdate((update) => !update);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      try {
        await editNote(props.note);
        props.setUpdate((update) => !update);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div style={{ backgroundColor: note.color }} className={styles.CardNote}>
      <HeaderNote
        disabledInput={!edit}
        note={note}
        setNote={setNote}
        setUpdate={props.setUpdate}
      />

      <div className={styles.EditNote}>
        <textarea
          disabled={!edit}
          defaultValue={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />

        <div className={styles.Tools}>
          <span>
            <img
              src={iconEdit}
              alt="Editar nota"
              title="Editar nota"
              onClick={() => setEdit(!edit)}
            />
            <img
              src={iconColor}
              alt="Colorir nota"
              title="Colorir nota"
              onClick={() => setShowPallete(!showPallete)}
            />
          </span>
          <img
            src={iconOut}
            alt="Excluir nota"
            title="Excluir nota"
            onClick={handleDeleteNote}
          />
        </div>
      </div>

      {showPallete && (
        <div className={styles.Pallete}>
          {colors.map((color) => (
            <span
              style={{ backgroundColor: color.code }}
              title={color.name}
              onClick={() => handleEditColorNote(color.code)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}
