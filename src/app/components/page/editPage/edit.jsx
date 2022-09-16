import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../../utils/validator";
import { useHistory } from "react-router-dom";
import api from "../../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
const EditUser = ({ user }) => {
  const params = useParams(); //получаем доступ к match.params
  const { userId } = params;

  const [qualities, setQualities] = useState([]);
  const [professions, setProfessions] = useState({});
  const [editedUsers, setEditedUsers] = useState();
  console.log(user.profession.name);
  console.log(user?.profession.name);
  console.log(editedUsers?.profession.name);

  const [data, setData] = useState({
    name: editedUsers?.name || user.name,
    email: editedUsers?.email || user.email,
    profession: "editedUsers?.profession.name || user.profession.name",
    sex: editedUsers?.sex || user.sex,
    qualities: [],
    stayOn: false,
  }); //отслеживаем начальное состояние элементов формы
  useEffect(() => {
    api.users.update(userId, data).then((data) => {
      setEditedUsers(data);
    });
  }, [data]);

  useEffect(() => {
    //useEffect вызывается каждый раз, когда монтируем что-то в DOM. Можем один раз при монтировании компонента, или каждый раз при изменении компонента, или можем его вызывать, когда изменяется какое либо состояние
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    console.log(target);
    console.log(target.name);
    console.log(target.value);

    // получаем предыдущее состояние через callback и возвращаем объект с предыдущим состоянием и изменением выбранного элемента формы

    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const getProfessionById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof];
      if (profData._id === id) return profData;
    }
  };
  const getQualities = (elements) => {
    const qualitiessaArray = [];
    for (const element of elements) {
      for (const qualy in qualities) {
        if (element.value === qualities[qualy]._id) {
          qualitiessaArray.push(qualities[qualy]);
        }
      }
    }
    return qualitiessaArray;
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
    profession: {
      isRequired: {
        message: "Выберите вашу профессию",
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
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(); // получаем результат валидации true or false
    if (!isValid) return; // если валидация выдала ошибку, останавливаем функцию
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => {
        editedUsers(data);
      });
  };
  const goToBack = () => {
    history.push(`/layouts/users/${userId}`);
  };
  /*  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(); // получаем результат валидации true or false
    if (!isValid) return; // если валидация выдала ошибку, останавливаем функцию
  };
  const history = useHistory();
 */
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {editedUsers === undefined ? (
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
EditUser.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
export default EditUser;
