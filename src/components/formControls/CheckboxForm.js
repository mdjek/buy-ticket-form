import React, { Fragment } from 'react';
import { Checkbox } from 'antd';

const CheckboxForm = ({
  checked,
  name,
  label,
  error,
  handleChange,
  ...props
}) => {
  return (
    <Fragment>
      <Checkbox
        checked={checked}
        name={name}
        {...props}
        onChange={(e) => handleChange(name, e.target.checked)}
      >
        {label}
      </Checkbox>
      <div>
        {error && <span className="error">{error}</span>}
      </div>
    </Fragment>
  );
};

export default CheckboxForm;
