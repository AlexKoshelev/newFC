import React, { useState } from "react";
import User from "./user";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  return (
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
        <User users={users} />
      </tbody>
    </table>
  );
};
export default Users;
