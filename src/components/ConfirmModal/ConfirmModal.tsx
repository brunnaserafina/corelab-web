import Modal from "react-modal";
import styles from "./ConfirmModal.module.scss";

interface IConfirmModal {
  message: string;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmModal: () => void;
}

const ConfirmModal = (props: IConfirmModal) => {
  function closeModal() {
    props.setModalIsOpen(false);
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles.ConfirmModal}
    >
      <h4>{props.message}</h4>
      <div>
        <button onClick={closeModal}>cancelar</button>
        <button onClick={props.confirmModal}>confirmar</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
