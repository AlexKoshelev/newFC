import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/layouts/main"
          >
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/layouts/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/layouts/users">
            Users
          </Link>
        </li>
      </ul>
    </>
  );
};
export default NavBar;
