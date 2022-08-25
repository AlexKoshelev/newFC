import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";
import Table from "./table";

const UserTable = ({ users, onDelete, onBookmark, selectedSort, onSort }) => {
  const columns = {
    name: { iter: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <Qualitie qualities={user.qualities} />,
    },
    profession: { iter: "profession.name", name: "Профессия" },
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
