import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../app/components/page/userPage";
import UsersListPage from "../app/components/page/usersListPage";
import UserProvider from "../app/hooks/useUsers";
const Users = () => {
  const params = useParams(); //получаем доступ к match.params
  const { userId } = params; //получаем id по ссылке в userTable
  const { edit } = params;

  return (
    <>
      <UserProvider>
        {userId ? (
          <UserPage userId={userId} pathName={edit} />
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  ); //если получили id, то отображаем страницу пользователя
};
export default Users;
