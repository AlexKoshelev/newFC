import React from "react";
import PropTypes from "prop-types";
const SelectField = ({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const getInputClasses = () => {
    // если ошибка есть, отображаем класс ошибки
    return error ? "form-select is-invalid" : "form-select";
  };
  let optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string,
};
export default SelectField;
