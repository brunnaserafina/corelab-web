import star from "../../../assets/images/icon-star.svg";
import starSolid from "../../../assets/images/icon-star-solid.svg";
import styles from "./HeaderNote.module.scss";
import INote from "../../../types/INote";
import { deleteFavorite, postFavorite } from "../../../lib/api";

interface HeaderProps {
  note: INote;
  disabledInput: boolean;
  setNote: React.Dispatch<React.SetStateAction<INote>>;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderNote(props: HeaderProps) {
  function handleFavoriteNote() {
    if (props.setUpdate !== undefined && props.note.id) {
      if (props.note.favorite) {
        deleteFavorite(props.note.id);
      } else {
        postFavorite(props.note.id);
      }

      props.note.favorite = !props.note.favorite;
      props.setUpdate((update: boolean) => !update);
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
      />

      <img
        src={props.note.favorite ? starSolid : star}
        alt="Favoritar"
        title="Favoritar nota"
        onClick={handleFavoriteNote}
      />
    </div>
  );
}
