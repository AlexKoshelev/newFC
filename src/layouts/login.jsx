import React, { useEffect, useState } from "react";
import TextField from "../app/components/textField";
import { validator } from "../utils/validator";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" }); //отслеживаем начальное состояние элементов формы
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    // получаем предыдущее состояние через callback и возвращаем объект с предыдущим состоянием и изменением выбранного элемента формы
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const validatorConfig = {
    // конфигурация валидатора
    email: {
      isRequired: {
        message: "Заполните почту",
      },
      isEmail: {
        message: "Проверьте правильность ввода почты",
      },
    },
    password: {
      isRequired: {
        message: "Введите пароль",
      },
      isUpperSymbol: {
        message: "Пароль должен содержать заглавную букву",
      },
      isNumberSymbol: {
        message: "Пароль должен содержать число",
      },
      isMinLength: {
        message: "Пароль должен состоять из хотя бы 8 символов",
        value: 8,
      },
    },
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0; //возвращаем результат валидации
  };
  useEffect(() => {
    //если состоянии формы изменяется, вызываем метод validate
    validate();
  }, [data]);
  const isValid = Object.keys(errors).length === 0; // true, если ошибок нет, используем для активации кнопки
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(); // получаем результат валидации true or false
    if (!isValid) return; // если валидация выдала ошибку, останавливаем функцию
    console.log(data);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="md-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label={"Введите ваш email"}
              name={"email"}
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label={"Введите пароль"}
              type={"password"}
              name={"password"}
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
