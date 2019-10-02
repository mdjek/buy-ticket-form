import React from 'react';
import InputMask from 'react-input-mask';

const InputForm = (props) => {
  const { value, onChange, type, placeholder, mask } = props;

  return (
    <InputMask mask={mask} value={value}>
      {() => (
        <input
          className="ant-input"
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          {...props}
        />
      )}
    </InputMask>
  );
};

export default InputForm;
