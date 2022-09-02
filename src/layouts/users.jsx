import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../app/components/userPage";
import UsersList from "../app/components/usersList";
const Users = () => {
  const params = useParams(); //получаем доступ к match.params
  const { userId } = params; //получаем id по ссылке в userTable
  return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>; //если получили id, то отображаем страницу пользователя
};
export default Users;
