import React from "react";
import PropTypes from "prop-types";
const GroupList = ({
  items,
  onItemSelect,
  valueProperty,
  contentProperty,
  selectedItem,
}) => {
  // valueProperty и contentProperty - универсальные значения, которые мы передаем в компонент или задаем по дефолту, тем самым увеличиваем чистоту кода и повышаем возможность переиспользовать компонент
  return (
    <>
      {Object.keys(items).map((item) => (
        <ul key={items[item][valueProperty]} className="list-group">
          <li
            className={
              "list-group-item " +
              (items[item] === selectedItem ? "active" : "")
            }
            onClick={() => onItemSelect(items[item])}
            role="button"
          >
            {items[item][contentProperty]}
          </li>
        </ul>
      ))}
    </>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};
GroupList.propTypes = {
  items: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
};
export default GroupList;
