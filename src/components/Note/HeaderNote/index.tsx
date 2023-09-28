import star from "../../../assets/images/icon-star.svg";
import starSolid from "../../../assets/images/icon-star-solid.svg";
import styles from "./HeaderNote.module.scss";
import { useState } from "react";

export default function HeaderNote(props: any) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className={styles.HeaderNote}>
      <input
        type="text"
        value={props.value}
        placeholder="Título"
        disabled={props.disabledInput}
      />

      <img
        src={favorite ? starSolid : star}
        alt="Favoritar"
        onClick={() => setFavorite(!favorite)}
      />
    </div>
  );
}
