import HeaderNote from "../HeaderNote";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import { useState } from "react";
import INote from "../../../types/INote";
import { deleteNote, editColorNote } from "../../../lib/api";

export default function CardNote(props: any) {
  const [edit, setEdit] = useState<boolean>(false);
  const [showPallete, setShowPallete] = useState<boolean>(false);
  const [note, setNote] = useState<INote>({
    id: props.note?.id,
    title: props.note?.title,
    content: props.note?.content,
    favorite: props.favorite,
    color: props.note?.color,
  });

  const colors: any[] = [
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

  async function handleDeleteNote() {
    if (window.confirm("Tem certeza que deseja deletar essa nota?")) {
      await deleteNote(props.note.id);
      props.setUpdate((update: boolean) => !update);
    }
  }

  async function handleEditColorNote(color: string) {
    setNote({ ...note, color });
    setShowPallete(false);
    await editColorNote(props.note.id, { ...note, color });
    props.setUpdate((update: boolean) => !update);
  }

  return (
    <div style={{ backgroundColor: note.color }} className={styles.CardNote}>
      <HeaderNote
        disabledInput={false}
        note={note}
        setNote={setNote}
        setUpdate={props.setUpdate}
      />

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
