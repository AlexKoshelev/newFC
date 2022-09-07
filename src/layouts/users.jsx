import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../app/components/page/userPage";
import UsersListPage from "../app/components/page/usersListPage";
const Users = () => {
  const params = useParams(); //получаем доступ к match.params
  const { userId } = params; //получаем id по ссылке в userTable
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>; //если получили id, то отображаем страницу пользователя
};
export default Users;
