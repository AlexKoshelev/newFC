import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
  }); //отслеживаем начальное состояние элементов формы
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState();
  const [professions, setProfessions] = useState();
  useEffect(() => {
    //useEffect вызывается каждый раз, когда монтируем что-то в DOM. Можем один раз при монтировании компонента, или каждый раз при изменении компонента, или можем его вызывать, когда изменяется какое либо состояние
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);
  const handleChange = (target) => {
    // получаем предыдущее состояние через callback и возвращаем объект с предыдущим состоянием и изменением выбранного элемента формы

    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
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
    profession: {
      isRequired: {
        message: "Выберите вашу профессию",
      },
    },
    licence: {
      isRequired: {
        message: "Ознакомьтесь с лицензионным соглашением",
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
        <SelectField
          label={"Выберите профессию"}
          name={"profession"}
          value={data.profession}
          onChange={handleChange}
          defaultOption={"Choose..."}
          options={professions}
          error={errors.profession}
        />
        <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" },
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
          label={"Выберите ваш пол"}
        />
        <MultiSelectField
          options={qualities}
          defaultValue={data.qualities}
          onChange={handleChange}
          name={"qualities"}
          label={"Укажите ваши качества"}
        />
        <CheckBoxField
          value={data.licence}
          name={"licence"}
          onChange={handleChange}
          error={errors.licence}
        >
          Подтвердить <a>лицензионное соглашение</a>
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
export default RegisterForm;
