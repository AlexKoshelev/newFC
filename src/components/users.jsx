import React, { useState, useEffect } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const pageSize = 4; // количество пользователей на странице
  const [currentPage, setCurrentPage] = useState(1); // по умолчанию всегда выбираем первую страницу
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    //useEffect вызывается каждый раз, когда монтируем что-то в DOM. Можем один раз при монтировании компонента, или каждый раз при изменении компонента, или можем его вызывать, когда изменяется какое либо состояние
    console.log("rendre");
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
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
    //передаем выбранную страницу в состояние
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    //передаем в состояние выбранную профессию
    setSelectedProf(item);
  };
  const filtredUsers = selectedProf //если selectedProf есть, то фильтруем исходный массив по совпадению с selectedProf, если нет, то возращаем всех users
    ? users.filter((user) => user.profession === selectedProf)
    : users;
  const userCrop = paginate(filtredUsers, currentPage, pageSize); // получаем новый массив, обрезанный под размер страницы
  const clearFilter = () => {
    //сбрасываем исходные значения
    setSelectedProf();
  };
  return (
    <>
      <div className="d-flex">
        <>
          {professions && ( //если профессии есть, рендерим список профессий
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
              />
              <button className="btn btn-secondary" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
        </>
        <div className="d-flex flex-column ">
          <SearchStatus number={filtredUsers.length} />
          {filtredUsers.length > 0 ? (
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
              <div className="d-flex justify-content-center">
                <Pagination
                  item={filtredUsers.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Users;
