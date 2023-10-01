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
  favorite: boolean;
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderNote(props: HeaderNoteProps) {
  async function handleFavoriteNote() {
    if (props.note.id) {
      try {
        if (props.favorite) {
          await deleteFavorite(props.note.id);
          props.setFavorite(false);
        } else {
          await postFavorite(props.note.id);
          props.setFavorite(true);
        }
        props.setUpdate((update: boolean) => !update);
      } catch (error) {
        console.error(error);
      }
    } else {
      if (props.favorite) {
        props.setFavorite(false);
        props.setNote({ ...props.note, favorite: false });
      } else {
        props.setFavorite(true);
        props.setNote({ ...props.note, favorite: true });
      }
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      try {
        if (props.note.id !== undefined && props.setEdit) {
          await editNote(props.note);
          props.setEdit(false);
        } else {
          await postNote(props.note);
          props.setNote({
            ...props.note,
            title: "",
            content: "",
            favorite: false,
          });
          props.setFavorite(false);
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
        src={props.favorite ? starSolid : star}
        alt="Favoritar"
        title="Favoritar nota"
        onClick={handleFavoriteNote}
      />
    </div>
  );
}
