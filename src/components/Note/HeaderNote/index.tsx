import star from "../../../assets/images/icon-star.svg";
import starSolid from "../../../assets/images/icon-star-solid.svg";
import styles from "./HeaderNote.module.scss";
import INote from "../../../types/INote";

interface HeaderProps {
  note: INote;
  disabledInput: boolean;
  setNote: React.Dispatch<React.SetStateAction<INote>>;
}

export default function HeaderNote(props: HeaderProps) {
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
        onClick={() =>
          props.setNote({ ...props.note, favorite: !props.note.favorite })
        }
      />
    </div>
  );
}
