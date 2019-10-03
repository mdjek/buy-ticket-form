import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
      <div>{error && <span className="error">{error}</span>}</div>
    </Fragment>
  );
};

CheckboxForm.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func,
};

export default CheckboxForm;
