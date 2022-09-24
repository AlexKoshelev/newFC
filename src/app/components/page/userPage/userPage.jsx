import React, { useEffect, useState } from "react";
import api from "../../../../api";
import Qualitie from "../../ui/qualities/qualitie";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import EditUser from "../editPage/edit";

const UserPage = ({ userId, pathName }) => {
  const [selectedUsers, setSelectedUsers] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setSelectedUsers(data);
    });
  }, [userId]); //получаем объект с данными по выбранному пользователю

  const history = useHistory();
  const goToBack = () => {
    history.push(`/layouts/users/`);
  };

  return (
    <>
      {selectedUsers === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {pathName === "edit" /* проверяем правильность пути */ ? (
            <EditUser />
          ) : (
            <div className="mx-2">
              <h1>{selectedUsers.name}</h1>
              <h2>{`Профессия: ${selectedUsers.profession.name}`}</h2>
              <div>
                <Qualitie qualities={selectedUsers.qualities} />
              </div>
              <div>{`CompletedMeetings: ${selectedUsers.completedMeetings}`}</div>
              <h2>{`Rate: ${selectedUsers.rate}`}</h2>

              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  goToBack();
                }}
              >
                Все пользователи
              </button>
              <Link to={`${history.location.pathname}/edit`}>
                <button className="btn btn-danger">Изменить данные</button>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};
UserPage.propTypes = {
  userId: PropTypes.string,
  editUser: PropTypes.string,
};
export default UserPage;
