import React, { Fragment } from 'react';
import { Input } from 'antd';

const InputForm = ({ error, type, ...props }) => (
  <Fragment>
    <Input type={type || 'text'} {...props} />
    {error && <span className="error">{error}</span>}
  </Fragment>
);

export default InputForm;
