import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "../ImageModal/ImageModal";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    async function getGallery() {
      if (prevTopic === "") {
        return;
      }
      try {
        setError(false);
        setLoading(true);
        setGallery([]);

        const response = await fetchImagesWithTopic(prevTopic, page);

        setGallery([...gallery, ...response]);

        if (response.length === 0) {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [page, prevTopic]);

  const handleSearch = async (topic) => {
    setError(false);
    setLoading(false);
    setPage(1);
    setGallery([]);
    setPrevTopic(topic);
  };

  const handleLoadMore = async () => {
    setPage((page) => page + 1);
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
          imgLikes={modalImg.likes}
          imgCreated={modalImg.created_at}
        />
      )}
    </div>
  );
}
export default App;
