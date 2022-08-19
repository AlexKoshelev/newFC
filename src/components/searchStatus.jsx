import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ number }) => {
  const renderPrase = (number) => {
    // получаем число number, в зависимости от которогу будут сгенерированны фразы
    if (number === 0) {
      return (
        <span className="badge bg-danger">
          <h3>Никто с тобой не тусанет</h3>
        </span>
      );
    } else if (
      number === 1 ||
      (number >= 5 && number <= 20) ||
      !(number % 10 >= 2 && number % 10 <= 4)
    ) {
      return (
        <span className="badge bg-primary">
          <h3>{`${number} человек тусанет с тобой сегодня`}</h3>
        </span>
      );
    } else if (
      (number >= 2 && number <= 4) ||
      (number % 10 >= 2 && number % 10 <= 4)
    ) {
      return (
        <span className="badge bg-primary">
          <h3>{`${number} человека тусанут с тобой сегодня`}</h3>
        </span>
      );
    }
  };
  return renderPrase(number);
};

SearchStatus.propTypes = {
  number: PropTypes.number.isRequired,
};
export default SearchStatus;
