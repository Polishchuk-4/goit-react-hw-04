import ImageCard from "../ImageCard/ImageCard";

import style from "./ImageGallery.module.css";

export default function ImageGallery({ gallery, openModal }) {
  return (
    <ul className={style.imageGallery}>
      {gallery.map((image) => {
        return (
          <li key={image.id}>
            <ImageCard
              url={image.urls.small}
              description={image.alt_description}
              openModal={() => openModal(image)}
            />
          </li>
        );
      })}
    </ul>
  );
}
