import React from "react";
const User = ({ users }) => {
  return (
    <>
      {/* получаем юзеров и заполняем таблицу */}
      {users.map((user) => (
        <tr scope="row">
          <td>{user.name}</td>
          <td>
            {user.qualities.map((quality) => (
              <span>{quality.name}</span>
            ))}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>{"delete"}</td>
        </tr>
      ))}
    </>
  );
};
export default User;
