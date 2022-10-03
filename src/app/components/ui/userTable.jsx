import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import QualitiesList from "./qualities/qualitieList";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";
const UserTable = ({ users, onDelete, onBookmark, selectedSort, onSort }) => {
  const columns = {
    name: {
      iter: "name",
      name: "Имя",
      component: (user) => (
        <Link to={`/layouts/users/${user._id}`}>{user.name}</Link>
      ),
    },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    profession: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />,
    },
    completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Оценка" },
    bookmark: {
      iter: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onBookmark={onBookmark}
          id={user._id}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          Удалить
        </button>
      ),
    },
  };
  return (
    <Table
      data={users}
      selectedSort={selectedSort}
      onSort={onSort}
      columns={columns}
    />
  );
};
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};
export default UserTable;
