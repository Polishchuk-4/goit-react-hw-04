import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "../ImageModal/ImageModal";

import { useState } from "react";
import fetchImagesWithTopic from "../../images-api";

import style from "./App.module.css";

function App() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [prevTopic, setPrevTopic] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const handleSearch = async (topic) => {
    try {
      setError(false);
      setLoading(true);
      setGallery([]);
      setPage(1);
      setPrevTopic(topic);

      const response = await fetchImagesWithTopic(topic, page);

      setGallery(response);

      if (response.length === 0) {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
    console.log(topic);
  };

  const handleLoadMore = async () => {
    try {
      setPage((page) => page + 1);
      const response = await fetchImagesWithTopic(prevTopic, page);
      setGallery([...gallery, ...response]);
    } catch (er) {
      setError(true);
      console.log(er);
    }
    console.log(page);
  };

  function openModal(img) {
    setModalImg(img);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalImg("");
  }
  return (
    <div className={style.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery gallery={gallery} openModal={openModal} />
      {gallery.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          imgUrl={modalImg.urls.regular}
          imgDecription={modalImg.alt_description}
        />
      )}
      {console.log(modalIsOpen)}
    </div>
  );
}
export default App;
