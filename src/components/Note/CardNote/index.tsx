import HeaderNote from "../HeaderNote";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import { useState } from "react";

export default function CardNote() {
  const [showPallete, setShowPallete] = useState<boolean>(false);
  const [colorClick, setColorClick] = useState<string>("#ffffff");
  const [edit, setEdit] = useState<boolean>(false);

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

  function deleteNote() {
    window.confirm("Tem certeza que deseja deletar essa nota?");
  }

  return (
    <div style={{ backgroundColor: colorClick }} className={styles.CardNote}>
      <HeaderNote disabledInput={!edit} />

      <div className={styles.EditNote}>
        <textarea name="" id="" disabled={!edit}>
          Nota
        </textarea>

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
            onClick={deleteNote}
          />
        </div>
      </div>

      {showPallete && (
        <div className={styles.Pallete}>
          {colors.map((color) => (
            <span
              style={{ backgroundColor: color }}
              onClick={() => {
                setColorClick(color);
                setShowPallete(false);
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}
