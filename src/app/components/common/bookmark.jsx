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
Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onBookmark: PropTypes.func.isRequired,
};
export default Bookmark;
