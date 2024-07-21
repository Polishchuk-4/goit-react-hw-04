import Modal from "react-modal";

import style from "./ImageModal.module.css";

const customStyles = {
  content: {
    width: "80vw",
    height: "80vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgb(32 32 32 / 75%)",
  },
};

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  closeModal,
  imgUrl,
  imgDescription,
}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <img src={imgUrl} alt={imgDescription} className={style.img} />
      <p className={style.modalText}>text</p>
    </Modal>
  );
}
