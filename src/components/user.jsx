import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
const User = ({ user, onDelete, onBookmark }) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
  } = user;
  return (
    <>
      {/* получаем юзеров и заполняем таблицу */}

      <tr>
        <td>{name}</td>
        <td>
          <Qualitie qualities={qualities} />
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}</td>
        <td>
          <Bookmark status={bookmark} onBookmark={onBookmark} id={_id} />
        </td>
        <td>
          {
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(_id)}
            >
              Удалить
            </button>
          }
        </td>
      </tr>
    </>
  );
};
export default User;
