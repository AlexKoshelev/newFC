import React, { useState } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const numberOfUsers = users.length; // количество пользователей
  const pageSize = 4; // количество пользователей на странице
  const [currentPage, setCurrentPage] = useState(1); // по умолчанию всегда выбираем первую страницу
  const handleDelete = (userId) => {
    //получаем новый массив пользователей, исключающий выбранного пользователя
    const newUsers = users.filter((user) => userId !== user._id);
    setUsers(newUsers);
  };
  const handleFavorite = (id) => {
    //получаем новый массив пользователей, где меняем bookmark по клику на него
    const newUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newUsers);
  };
  const handlePageChange = (pageIndex) => {
    //передаем выбранную страницу
    setCurrentPage(pageIndex);
  };
  const userCrop = paginate(users, currentPage, pageSize); // получаем новый массив, обрезанный под размер страницы
  return (
    <>
      <SearchStatus number={numberOfUsers} />
      {numberOfUsers > 0 ? (
        <div>
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
              {userCrop.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  onDelete={handleDelete}
                  onBookmark={handleFavorite}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            item={numberOfUsers}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </>
  );
};
export default Users;
