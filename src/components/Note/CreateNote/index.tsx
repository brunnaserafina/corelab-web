import { useState } from "react";
import star from "../../../assets/images/icon-star.svg";
import starSolid from "../../../assets/images/icon-star-solid.svg";
import styles from "./CreateNote.module.scss";

export default function CreateNote() {
  const [text, setText] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleTextareaChange = (e: any) => {
    const textarea = e.target;
    textarea.style.height = "20px";
    const scHeight = textarea.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    setText(textarea.value);
  };

  return (
    <div className={styles.CreateNote}>
      <div className={styles.HeaderNote}>
        <h1>Título</h1>

        <img
          src={favorite ? starSolid : star}
          alt="Favoritar"
          onClick={() => setFavorite(!favorite)}
        />
      </div>

      <div className={styles.WriteNote}>
        <textarea
          placeholder="Criar nota..."
          value={text}
          onChange={handleTextareaChange}
        />
      </div>
    </div>
  );
}
