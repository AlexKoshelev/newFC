import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";
const Table = ({ selectedSort, onSort, columns, data, onUserId, userId }) => {
  return (
    <table className="table">
      <TableHeader
        selectedSort={selectedSort}
        onSort={onSort}
        columns={columns}
      />
      <TableBody
        data={data}
        columns={columns}
        onUserId={onUserId}
        userId={userId}
      />
    </table>
  );
};
Table.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};
export default Table;
