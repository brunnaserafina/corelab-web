import { useState } from "react";
import star from "../../../assets/images/icon-star.svg";
import starSolid from "../../../assets/images/icon-star-solid.svg";
import styles from "./HeaderNote.module.scss";
import INote from "../../../types/INote";
import {
  deleteFavorite,
  editNote,
  postFavorite,
  postNote,
} from "../../../lib/api";


interface HeaderNoteProps {
  note: INote;
  disabledInput: boolean;
  setNote: React.Dispatch<React.SetStateAction<INote>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderNote(props: HeaderNoteProps) {
  const [favorite, setFavorite] = useState<boolean>(props.note.favorite);

  async function handleFavoriteNote() {
    if (props.note.id) {
      try {
        if (favorite) {
          await deleteFavorite(props.note.id);
        } else {
          await postFavorite(props.note.id);
        }
        setFavorite(!favorite);
        props.setUpdate((update: boolean) => !update);
      } catch (error) {
        console.error(error);
      }
    } else {
      setFavorite(!favorite);
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      try {
        if (props.note.id) {
          await editNote(props.note);
        } else {
          await postNote(props.note);
          props.setNote({ ...props.note, title: "" });
        }
        props.setUpdate((update: boolean) => !update);
      } catch (error) {
        console.error("Erro ao salvar a nota:", error);
      }
    }
  }

  return (
    <div className={styles.HeaderNote}>
      <input
        type="text"
        value={props.note.title}
        placeholder="Título"
        disabled={props.disabledInput}
        onChange={(e) =>
          props.setNote({ ...props.note, title: e.target.value })
        }
        onKeyDown={handleKeyDown}
      />

      <img
        src={favorite ? starSolid : star}
        alt="Favoritar"
        title="Favoritar nota"
        onClick={handleFavoriteNote}
      />
    </div>
  );
}
