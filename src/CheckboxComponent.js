import React from 'react';

const CheckboxComponent = ({ dataKeys, checkboxStates, handleCheckboxChange }) => {
  return (
    <div>
      {dataKeys.map((key) => (
        <div key={key} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={checkboxStates[key]}
            onChange={() => handleCheckboxChange(key)}
            id={`checkbox-${key}`}
          />
          <label className="form-check-label" htmlFor={`checkbox-${key}`}>
            {key}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxComponent;
