import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

const ToggleBookmarkButton = ({ book, listName }) => {
  const { favourites, toBeRead, toggleBookmark } = useContext(BookmarkContext);

  const isInList =
    listName === "favourites"
      ? favourites.some((b) => b.id === book.id)
      : toBeRead.some((b) => b.id === book.id);

  const handleClick = () => {
    toggleBookmark(book, listName);
  };

  const iconStyle = {
    cursor: "pointer",
    fontSize: "1.4rem",
    color: listName === "favourites" ? "#d62828" : "#0077b6",
  };

  return (
    <span onClick={handleClick} title={`Toggle ${listName}`}>
      {listName === "favourites" ? (
        isInList ? <FaHeart style={iconStyle} /> : <FaRegHeart style={iconStyle} />
      ) : (
        isInList ? <FaBookmark style={iconStyle} /> : <FaRegBookmark style={iconStyle} />
      )}
    </span>
  );
};

export default ToggleBookmarkButton;
