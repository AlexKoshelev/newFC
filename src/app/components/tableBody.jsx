import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";
const TableBody = ({ data, columns, onUserId, userId }) => {
  console.log(userId);
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    if (columns[column].iter === "name") {
      return (
        <Link
          to="/userPage"
          onClick={() => {
            onUserId("item._id");
          }}
        >
          {_.get(item, columns[column].iter)}
        </Link>
      ); //проверяем на ключ === name, если да, то рендерим ссылку на данные о юзере
    } else {
      return _.get(item, columns[column].iter);
    }
  };
  return data.map((item) => (
    <tbody key={item._id}>
      <tr>
        {Object.keys(columns).map((column) => (
          <td key={column}>{renderContent(item, column)}</td>
        ))}
      </tr>
    </tbody>
  ));
};
TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};
export default TableBody;
