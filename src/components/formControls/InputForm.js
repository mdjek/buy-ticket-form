import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const InputForm = ({ error, type, ...props }) => (
  <Fragment>
    <Input type={type || 'text'} {...props} />
    {error && <span className="error">{error}</span>}
  </Fragment>
);

InputForm.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string,
};

export default InputForm;
