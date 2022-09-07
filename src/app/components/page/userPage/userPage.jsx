import React, { useEffect, useState } from "react";
import api from "../../../../api";
import Qualitie from "../../ui/qualities/qualitie";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const [selectedUsers, setSelectedUsers] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setSelectedUsers(data);
    });
  }, [userId]); //получаем объект с данными по выбранному пользователю
  const history = useHistory();
  const goToBack = () => {
    history.push("/layouts/users");
  };
  return (
    <>
      {selectedUsers === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{selectedUsers.name}</h1>
          <h2>{`Профессия: ${selectedUsers.profession.name}`}</h2>
          <div>
            <Qualitie qualities={selectedUsers.qualities} />
          </div>
          <div>{`CompletedMeetings: ${selectedUsers.completedMeetings}`}</div>
          <h2>{`Rate: ${selectedUsers.rate}`}</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              goToBack();
            }}
          >
            Все пользователи
          </button>
        </div>
      )}
    </>
  );
};
UserPage.propTypes = {
  userId: PropTypes.array.isRequired,
};
export default UserPage;
