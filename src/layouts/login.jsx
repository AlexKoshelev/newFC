import React, { useState } from "react";
import LoginForm from "../app/components/ui/loginForm";
import RegisterForm from "../app/components/ui/registerForm";
import { useParams } from "react-router-dom";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const togleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="md-4">Register</h3>
              <RegisterForm />
              <p>
                Already have account?{" "}
                <a role={"button"} onClick={togleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="md-4">Login</h3>
              <LoginForm />
              <p>
                Dont have account?{" "}
                <a role={"button"} onClick={togleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
