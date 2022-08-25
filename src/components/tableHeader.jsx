import React from "react";
import PropTypes from "prop-types";
const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    //сортируем по выбранному параметру
    if (selectedSort.iter === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      }));
    } else {
      onSort({ iter: item, order: "asc" });
    }
  };
  const arrowSort = (item) => {
    if (selectedSort.iter === item) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-up-fill"></i>;
      } else if (selectedSort.order === "desc") {
        return <i className="bi bi-caret-down-fill"></i>;
      }
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].iter
                ? () => handleSort(columns[column].iter)
                : undefined
            }
            scope="col"
            role={columns[column].iter ? "button" : undefined}
          >
            {columns[column].name}
            <span>{arrowSort(columns[column].iter)}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  qolumns: PropTypes.object,
};
export default TableHeader;
