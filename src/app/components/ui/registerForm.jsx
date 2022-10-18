import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
  }); //отслеживаем начальное состояние элементов формы
  const [errors, setErrors] = useState({});
  const { qualities } = useQualities();
  const qualitiesList = qualities.map((qualityName) => ({
    label: qualityName.name,
    value: qualityName._id,
  }));
  const { professions } = useProfession();
  const professionList = professions.map((profName) => ({
    label: profName.name,
    value: profName._id,
  }));
  const { signUp } = useAuth();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(); // получаем результат валидации true or false
    if (!isValid) return; // если валидация выдала ошибку, останавливаем функцию
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };

    try {
      await signUp(newData);
      history.push("./");
    } catch (error) {
      setErrors(error);

      console.log(error);
    }
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
          options={professionList}
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
          options={qualitiesList}
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
