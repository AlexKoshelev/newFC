import React from "react";
import Qualitie from "./qualitie";
import { useHistory } from "react-router-dom";

const UserPage = ({ user }) => {
  const history = useHistory();
  const goToBack = () => {
    history.push("/layouts/users");
  };
  return (
    <>
      {user === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{user.name}</h1>
          <h2>{`Профессия: ${user.profession.name}`}</h2>
          <div>
            <Qualitie qualities={user.qualities} />
          </div>
          <div>{`CompletedMeetings: ${user.completedMeetings}`}</div>
          <h2>{`Rate: ${user.rate}`}</h2>
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
export default UserPage;
