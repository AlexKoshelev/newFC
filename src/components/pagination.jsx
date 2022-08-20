import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = ({ item, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(item / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1); // получаем массив, состоящий из страниц
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  item: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
