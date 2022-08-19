import React, { useState } from "react";
import User from "./user";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const numberOfUsers = users.length; // количество пользователей
  const handleDelete = (userId) => {
    //получаем новый массив пользователей
    const newUsers = users.filter((user) => userId !== user._id);
    setUsers(newUsers);
  };
  const renderPrase = (number) => {
    // Количество человек, которые с тобой тусанут
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
  return (
    <>
      {renderPrase(numberOfUsers)}
      {numberOfUsers > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} user={user} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};
export default Users;
