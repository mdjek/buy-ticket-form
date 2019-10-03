import React, { Fragment } from 'react';
import { Select } from 'antd';
import styles from './InputForm.module.scss';

const SelectForm = ({ error, name, children, handleChange, value, ...props }) => {
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
      {error && <span className={styles.error}>{error}</span>}
    </Fragment>
  );
};

export default SelectForm;
