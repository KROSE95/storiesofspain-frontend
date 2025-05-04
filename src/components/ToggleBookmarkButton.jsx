import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

const ToggleBookmarkButton = ({ book, listName }) => {
  const { favourites, toBeRead, toggleBookmark } = useContext(BookmarkContext);

//   const isInList =
//     listName === "favourites"
//       ? favourites.some((b) => b.id === book.id)
//       : toBeRead.some((b) => b.id === book.id);
const isInList = (list) =>
    list.some((b) => String(b.id) === String(book.id));
  
  const inList = listName === "favourites"
    ? isInList(favourites)
    : isInList(toBeRead);
  

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
      inList ? <FaHeart style={iconStyle} /> : <FaRegHeart style={iconStyle} />
    ) : (
      inList ? <FaBookmark style={iconStyle} /> : <FaRegBookmark style={iconStyle} />
    )}
  </span>
  );
};

export default ToggleBookmarkButton;
