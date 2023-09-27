import star from "../../../assets/images/icon-star.svg";
import starSolid from "../../../assets/images/icon-star-solid.svg";
import styles from "./HeaderNote.module.scss";
import { useState } from "react";

export default function HeaderNote() {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className={styles.HeaderNote}>
      <h1>Título</h1>

      <img
        src={favorite ? starSolid : star}
        alt="Favoritar"
        onClick={() => setFavorite(!favorite)}
      />
    </div>
  );
}
