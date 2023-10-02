import { useEffect, useRef, useState } from "react";
import {
  ConfirmModal,
  PaletteColors,
  ToolButton,
  HeaderNote,
} from "../../../components";
import { deleteNote, editColorNote, editNote } from "../../../lib/api";
import styles from "./CardNote.module.scss";
import iconEdit from "../../../assets/images/icon-edit.svg";
import iconColor from "../../../assets/images/icon-color.svg";
import iconOut from "../../../assets/images/icon-out.svg";
import INote from "../../../types/INote";

interface CardNoteProps {
  note: INote;
  favorite: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardNote(props: CardNoteProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const editColorRef = useRef<HTMLDivElement | null>(null);

  const [edit, setEdit] = useState<boolean>(false);
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [favorite, setFavorite] = useState<boolean>(props.favorite);

  const [note, setNote] = useState<INote>({
    ...props.note,
    favorite: props.favorite,
  });

  async function handleDeleteNote() {
    try {
      if (props.note.id) {
        await deleteNote(props.note.id);
        props.setUpdate((update: boolean) => !update);
      }
    } catch (err) {
      //console.log("Não foi possível deletar a nota. Tente novamente.");
    }
  }

  async function handleEditColorNote(color: string) {
    const colorIsChanging = props.note.color !== color;

    if (colorIsChanging && props.note.id) {
      try {
        setNote({ ...props.note, color });
        await editColorNote(props.note.id, { ...props.note, color });
        props.setUpdate((update) => !update);
        setShowPalette(false);
      } catch (err) {
        console.log("Não foi possível alterar a cor da nota. Tente novamente.");
      }
    } else {
      setShowPalette(false);
    }
  }

  async function handleEditNote() {
    if (props.note.content === note.content && props.note.title === note.title)
      return;

    try {
      await editNote(note);
      props.setUpdate((update) => !update);
    } catch (err) {
      console.log("Não foi possível editar a nota. Tente novamente.");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setEdit(false);
      handleEditNote();
    }
  }

  const activateEditAndFocusTextarea = async () => {
    if (edit) {
      setEdit(false);
      handleEditNote();
    } else {
      await setEdit(true);

      if (textareaRef.current && !textareaRef.current.disabled) {
        const textLength = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(textLength, textLength); //positions the cursor at the end of the textarea
        textareaRef.current.focus();
      }
    }
  };

  ///closed palette if user click outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const clickedOutsidePalette =
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node);

      const clickedOutsideEditColorIcon =
        editColorRef.current &&
        !editColorRef.current.contains(event.target as Node);

      if (clickedOutsidePalette && clickedOutsideEditColorIcon) {
        setShowPalette(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [paletteRef, editColorRef]);

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
          aria-label="Campo de nota"
          ref={textareaRef}
          disabled={!edit}
          defaultValue={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.Tools}>
          <span>
            <ToolButton
              active={edit}
              onClick={activateEditAndFocusTextarea}
              iconSrc={iconEdit}
              altText="Editar nota"
              titleText="Editar nota"
            />
            <ToolButton
              refference={editColorRef}
              active={showPalette}
              onClick={() => setShowPalette(!showPalette)}
              iconSrc={iconColor}
              altText="Colorir nota"
              titleText="Colorir nota"
            />
          </span>

          <img
            src={iconOut}
            alt="Excluir nota"
            title="Excluir nota"
            width="14"
            height="15"
            onClick={() => setModalIsOpen(true)}
          />
        </div>
      </div>

      {showPalette && (
        <PaletteColors
          paletteRef={paletteRef}
          handleEditColorNote={handleEditColorNote}
        />
      )}

      <ConfirmModal
        message="Tem certeza que deseja deletar essa nota?"
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        confirmModal={handleDeleteNote}
      />
    </div>
  );
}
