import React from "react";
import PropTypes from "prop-types";
const SearchLine = ({ getSerchValue, quantityOfUsers }) => {
  const getInputClasses = () => {
    // если ошибка есть, отображаем класс ошибки
    return quantityOfUsers === 0 ? "form-control is-invalid" : "form-control";
  };
  return (
    <>
      <div className="container">
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className={getInputClasses()}
            placeholder="Search"
            onChange={(event) => getSerchValue(event.target.value)}
          ></input>
          {quantityOfUsers === 0 && (
            <div className="invalid-feedback">Пользователь не найден</div>
          )}
        </div>
      </div>
    </>
  );
};
SearchLine.propTypes = {
  getSerchValue: PropTypes.func.isRequired,
  quantityOfUsers: PropTypes.number.isRequired,
};
export default SearchLine;
