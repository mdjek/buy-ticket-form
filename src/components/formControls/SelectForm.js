import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const SelectForm = ({
  error,
  name,
  children,
  handleChange,
  value,
  ...props
}) => {
  return (
    <Fragment>
      <Select
        name={name}
        value={value || undefined}
        onChange={(e) => handleChange(name, e)}
        {...props}
      >
        {children}
      </Select>
      {error && <span className="error">{error}</span>}
    </Fragment>
  );
};

SelectForm.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SelectForm;
