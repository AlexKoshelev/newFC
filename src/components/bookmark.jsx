import React from "react";
import PropTypes from "prop-types";
const Bookmark = ({ status, onBookmark, id }) => {
  return (
    <i
      className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
      onClick={() => onBookmark(id)}
    ></i>
  );
};
export default Bookmark;
