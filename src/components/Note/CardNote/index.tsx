import HeaderNote from "../HeaderNote";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import { useState } from "react";

export default function CardNote() {
  const [showPallete, setShowPallete] = useState<boolean>(false);
  const [colorClick, setColorClick] = useState<string>("#ffffff");

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

  return (
    <div style={{ backgroundColor: colorClick }} className={styles.CardNote}>
      <HeaderNote />

      <div className={styles.EditNote}>
        <textarea name="" id="">
          Nota
        </textarea>

        <div className={styles.Tools}>
          <span>
            <img src={iconEdit} alt="Editar nota" />
            <img
              src={iconColor}
              alt="Colorir nota"
              onClick={() => setShowPallete(!showPallete)}
            />
          </span>
          <img src={iconOut} alt="Excluir nota" />
        </div>
      </div>

      {showPallete && (
        <div className={styles.Pallete}>
          {colors.map((color) => (
            <span
              style={{ backgroundColor: color }}
              onClick={() => setColorClick(color)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}
