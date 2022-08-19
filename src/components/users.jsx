import React, { useState } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const numberOfUsers = users.length; // количество пользователей
  const handleDelete = (userId) => {
    //получаем новый массив пользователей
    const newUsers = users.filter((user) => userId !== user._id);
    setUsers(newUsers);
  };
  const handleFavorite = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newUsers);
  };
  return (
    <>
      <SearchStatus number={numberOfUsers} />
      {numberOfUsers > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                user={user}
                onDelete={handleDelete}
                onBookmark={handleFavorite}
              />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};
export default Users;
