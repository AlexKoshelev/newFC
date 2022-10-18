import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.services";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentUsers, setCurrentUsers] = useState();
  async function logIn({ email, password }) {
    const urlLog = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(urlLog, {
        email,
        password,
        returnSecureToken: true,
      });
      console.log(data);

      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "INVALID_PASSWORD") {
          throw new Error("Email или пароль введены некорректно");
        }
      }
    }
  }
  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);

      await createUsers({ _id: data.localId, email, ...rest });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует",
          };
          throw errorObject;
        }
      }
    }
  }
  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUsers(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function createUsers(data) {
    try {
      const { content } = userService.create(data);
      setCurrentUsers(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    console.log(error.response);

    setError(message);
  }

  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
