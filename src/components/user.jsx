import React from "react";
const User = ({ user, onDelete }) => {
  const { _id, name, qualities, profession, completedMeetings, rate } = user;
  return (
    <>
      {/* получаем юзеров и заполняем таблицу */}

      <tr>
        <td>{name}</td>
        <td>
          {qualities.map((quality) => (
            <span key={quality._id} className={`badge bg-${quality.color} m-2`}>
              {/* в зависимости от цвета рендерим качества */}
              {quality.name}
            </span>
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}</td>
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
