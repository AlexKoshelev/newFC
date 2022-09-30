import React from "react";
import PropTypes from "prop-types";
import Qualitie from "../qualities/qualitie";
const QualitiesCard = ({ user }) => {
  return (
    <>
      {user ? (
        <div>
          <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">
                <span>Qualities</span>
              </h5>
              <p className="card-text">
                <Qualitie qualities={user.qualities} />
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
QualitiesCard.propTypes = {
  user: PropTypes.object.isRequired,
};
export default QualitiesCard;
