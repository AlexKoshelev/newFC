import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import api from "../../../api";
/* import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import PropTypes from "prop-types"; */
const EditUser = ({ user, userId }) => {
  const [editedUsers, setEditedUsers] = useState();
  const [users, setUsers] = useState(user);
  const [data, setData] = useState({
    name: users.name,
    email: users.email,
    stayOn: false,
  }); //отслеживаем начальное состояние элементов формы
  useEffect(() => {
    api.users.update(userId, data).then((data) => {
      setEditedUsers(data);
    });
  }, [data]);
  useEffect(() => {
    setUsers(editedUsers);
  }, [editedUsers]);
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    // получаем предыдущее состояние через callback и возвращаем объект с предыдущим состоянием и изменением выбранного элемента формы
    setData((prevState) => ({
      ...prevState,
      [target.name]: user.name,
    }));
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    // конфигурация валидатора
    name: {
      isRequired: {
        message: "Введите имя",
      },
      isName: {
        message: "Запишите имя с большой буквы!",
      },
      isNameLength: {
        message: "Имя не может состоять из одного символа",
      },
    },
    email: {
      isRequired: {
        message: "Заполните почту",
      },
      isEmail: {
        message: "Проверьте правильность ввода почты",
      },
    },
  };
  useEffect(() => {
    //если состоянии формы изменяется, вызываем метод validate
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0; //возвращаем результат валидации
  };

  const isValid = Object.keys(errors).length === 0; // true, если ошибок нет, используем для активации кнопки
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(); // получаем результат валидации true or false
    if (!isValid) return; // если валидация выдала ошибку, останавливаем функцию
  };
  const history = useHistory();
  const goToBack = () => {
    api.users.update(userId, users).then((data) => {
      setEditedUsers(data);
    });
    history.push(`/layouts/users/${userId}`);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {user === undefined ? (
            <h1>Loading...</h1>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label={"Имя"}
                name={"name"}
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label={"Электронная почта"}
                name={"email"}
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              {/*    <SelectField
            label={"Выберите профессию"}
            name={"profession"}
            value={selectedUsers.profession.name}
            onChange={"handleChange"}
            defaultOption={"Choose..."}
            options={"professions"}
            error={"errors.profession"}
          /> */}
              {/*         <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" },
          ]}
          value={"data.sex"}
          name="sex"
          onChange={"handleChange"}
          label={"Выберите ваш пол"}
        /> */}
              <button
                type="submit"
                disabled={!isValid}
                onClick={() => {
                  goToBack(`/layouts/users/${userId}`);
                }}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить данные
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditUser;
