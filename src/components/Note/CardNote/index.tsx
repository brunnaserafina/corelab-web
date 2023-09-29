import HeaderNote from "../HeaderNote";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import { useState } from "react";
import INote from "../../../types/INote";
import { deleteNote } from "../../../lib/api";

export default function CardNote(props: any) {
  const [edit, setEdit] = useState<boolean>(false);
  const [showPallete, setShowPallete] = useState<boolean>(false);
  const [note, setNote] = useState<INote>({
    title: props.note?.title,
    content: props.note?.content,
    favorite: props.favorite,
    color: props.note?.color,
  });

  const colors: string[] = [
    "#bae2ff",
    "#b9ffdd",
    "#ffe8ac",
    "#ffcab9",
    "#f99494",
    "#9dd6ff",
    "#eca1ff",
    "#daff8b",
    "#ffa285",
    "#cdcdcd",
    "#979797",
    "#a99a7c",
  ];

  async function handleDeleteNote() {
    if (window.confirm("Tem certeza que deseja deletar essa nota?")) {
      await deleteNote(props.note.id);
      props.setUpdate((update: boolean) => !update);
    }
  }

  return (
    <div style={{ backgroundColor: note.color }} className={styles.CardNote}>
      <HeaderNote disabledInput={false} note={note} setNote={setNote} />

      <div className={styles.EditNote}>
        <textarea
          name=""
          id=""
          disabled={!edit}
          defaultValue={note.content}
          autoFocus
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
              style={{ backgroundColor: color }}
              onClick={() => {
                setNote({ ...note, color });
                setShowPallete(false);
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}
