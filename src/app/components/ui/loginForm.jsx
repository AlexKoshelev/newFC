import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../../utils/validator";
/* import * as yup from "yup"; */
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false }); //отслеживаем начальное состояние элементов формы
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    // получаем предыдущее состояние через callback и возвращаем объект с предыдущим состоянием и изменением выбранного элемента формы

    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  /*   const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required("Введите пароль")
      .matches(/(?=.*[A-Z])/, "Пароль должен содержать заглавную букву")
      .matches(/(?=.*[0-9])/, "Пароль должен содержать число")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать один из специальных символов !@#$%^&*"
      )
      .matches(/(?=.{8})/, "Пароль должен состоять из хотя бы 8 символов"),
    email: yup
      .string()
      .required("Заполните почту")
      .email("Проверьте правильность ввода почты"), 
  });*/
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
  useEffect(() => {
    //если состоянии формы изменяется, вызываем метод validate
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    /*     validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message })); */
    setErrors(errors);
    return Object.keys(errors).length === 0; //возвращаем результат валидации
  };

  const isValid = Object.keys(errors).length === 0; // true, если ошибок нет, используем для активации кнопки
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(); // получаем результат валидации true or false
    if (!isValid) return; // если валидация выдала ошибку, останавливаем функцию
    console.log(data);
  };
  return (
    <>
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
        <CheckBoxField
          value={data.stayOn}
          name={"stayOn"}
          onChange={handleChange}
        >
          Оставаться в системе
        </CheckBoxField>
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default LoginForm;
