export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired":
        if (typeof data === "boolean") {
          statusValidate = !data;
          break;
        } else {
          statusValidate = data.trim() === "";
          break;
        }
      case "isName":
        const nameRegExp = /^[A-ЯЁ]/g;
        statusValidate = !nameRegExp.test(data);
        break;
      case "isNameLength":
        const nameLengthRegExp = /^[A-ЯЁ][а-яё]/g;
        statusValidate = !nameLengthRegExp.test(data);
        break;
      case "isEmail":
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      case "isUpperSymbol":
        const upperSymbol = /[A-Z]+/g;
        statusValidate = !upperSymbol.test(data);
        break;
      case "isNumberSymbol":
        const numSymbol = /\d+/g;
        statusValidate = !numSymbol.test(data);
        break;
      case "isMinLength":
        statusValidate = data.length < config.value;
        break;
      default:
        break;
    }
    if (statusValidate) return config.message; // если хотя бы ондно условик true, выводим сообщение ошибки
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
