import style from "./ImageCard.module.css";

export default function ImageCard({ url, description, openModal }) {
  return (
    <div className={style.imageCard}>
      <img
        onClick={openModal}
        src={url}
        alt={description}
        className={style.imageCardImg}
      />
    </div>
  );
}
