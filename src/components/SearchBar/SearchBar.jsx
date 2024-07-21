import { IoIosSearch } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

import style from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;
    if (topic.trim() === "") {
      toast("Please, input else value.", {
        icon: "ℹ️",
      });
      return;
    }
    onSubmit(topic);
    form.reset();
  };

  return (
    <header className={style.searchBarHeader}>
      <form onSubmit={handleSubmit} className={style.searchBarForm}>
        <button type="submit" className={style.searchBarBtn}>
          <IoIosSearch className={style.searchBarBtnIcon} />
        </button>
        <input
          className={style.searchBarInput}
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <Toaster />
    </header>
  );
}
