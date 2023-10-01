import { useEffect, useRef, useState } from "react";
import HeaderNote from "../HeaderNote";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import INote from "../../../types/INote";
import { deleteNote, editColorNote, editNote } from "../../../lib/api";
import { colors } from "../../../utils/colors";
import Modal from "react-modal";

interface CardNoteProps {
  note: INote;
  favorite: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardNote(props: CardNoteProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [showPallete, setShowPallete] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const palleteRef = useRef<HTMLDivElement | null>(null);

  const [note, setNote] = useState<INote>({
    id: props.note?.id,
    title: props.note?.title,
    content: props.note?.content,
    favorite: props.favorite,
    color: props.note?.color,
  });

  const [favorite, setFavorite] = useState<boolean>(note.favorite);

  async function handleDeleteNote() {
    if (props.note.id) {
      await deleteNote(props.note.id);
      props.setUpdate((update: boolean) => !update);
    }
  }

  async function handleEditColorNote(color: string) {
    const updatedNote = { ...props.note, color };
    setNote(updatedNote);
    setShowPallete(false);

    try {
      if (props.note.id) {
        await editColorNote(props.note.id, updatedNote);
        props.setUpdate((update) => !update);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      try {
        await editNote(note);
        props.setUpdate((update) => !update);
        setEdit(false);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (palleteRef.current && !palleteRef.current.contains(event.target)) {
        setShowPallete(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ backgroundColor: note.color }} className={styles.CardNote}>
      <HeaderNote
        disabledInput={!edit}
        note={note}
        setNote={setNote}
        setUpdate={props.setUpdate}
        favorite={favorite}
        setFavorite={setFavorite}
        setEdit={setEdit}
      />

      <div className={styles.EditNote}>
        <textarea
          disabled={!edit}
          defaultValue={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />

        <div className={styles.Tools}>
          <span>
            <span
              style={{
                backgroundColor: edit ? "#FFE3B3" : "transparent",
              }}
            >
              <img
                src={iconEdit}
                alt="Editar nota"
                title="Editar nota"
                onClick={() => setEdit(!edit)}
              />
            </span>
            <span
              style={{
                backgroundColor: showPallete ? "#FFE3B3" : "transparent",
              }}
            >
              <img
                src={iconColor}
                alt="Colorir nota"
                title="Colorir nota"
                onClick={() => {
                  setShowPallete(!showPallete);
                }}
              />
            </span>
          </span>

          <img
            src={iconOut}
            alt="Excluir nota"
            title="Excluir nota"
            onClick={() => setModalIsOpen(true)}
          />
        </div>
      </div>

      {showPallete && (
        <div className={styles.Pallete} ref={palleteRef}>
          {colors.map((color) => (
            <span
              key={color.code}
              style={{ backgroundColor: color.code }}
              title={color.name}
              onClick={() => handleEditColorNote(color.code)}
            ></span>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className={styles.ModalDelete}
      >
        <h4>Tem certeza que deseja excluir essa nota?</h4>
        <div>
          <button onClick={closeModal}>cancelar</button>
          <button onClick={handleDeleteNote}>excluir</button>
        </div>
      </Modal>
    </div>
  );
}
