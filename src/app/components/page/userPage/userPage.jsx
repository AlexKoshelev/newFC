import React, { useEffect, useState } from "react";
import api from "../../../../api";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import EditUser from "../editPage/edit";
import UserCard from "../../ui/userPageCard/userCard";
import QualitiesCard from "../../ui/userPageCard/qualitiesCard";
import MeetingsCard from "../../ui/userPageCard/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId, pathName }) => {
  const [selectedUsers, setSelectedUsers] = useState();
  const history = useHistory();
  const path = useLocation().pathname;

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setSelectedUsers(data);
    });
  }, [userId, path]); //получаем объект с данными по выбранному пользователю

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          {selectedUsers === undefined ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {pathName === "edit" /* проверяем правильность пути */ ? (
                <EditUser />
              ) : (
                <>
                  <div className="col-md-4 mb-3">
                    <UserCard user={selectedUsers} />
                    <QualitiesCard user={selectedUsers} />
                    <MeetingsCard user={selectedUsers} />
                    <div className="card mb-3">
                      <div className="card-body d-flex flex-column justify-content-center text-center">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => history.push("/layouts/users/")}
                        >
                          Все пользователи
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <Comments />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
UserPage.propTypes = {
  userId: PropTypes.string,
  editUser: PropTypes.string,
};
export default UserPage;
