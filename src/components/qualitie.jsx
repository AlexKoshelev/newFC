import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <span key={quality._id} className={`badge bg-${quality.color} m-2`}>
          {/* в зависимости от цвета рендерим качества */}
          {quality.name}
        </span>
      ))}
    </>
  );
};

Qualitie.propTypes = {
  qualities: PropTypes.array.isRequired,
};
export default Qualitie;
