import { useState } from "react";
import HeaderNote from "../HeaderNote";

import styles from "./CreateNote.module.scss";

export default function CreateNote() {
  const [text, setText] = useState("");

  const handleTextareaChange = (e: any) => {
    const textarea = e.target;
    textarea.style.height = "20px";
    const scHeight = textarea.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    setText(textarea.value);
  };

  return (
    <div className={styles.CreateNote}>
      <HeaderNote disabledInput={false} />

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
