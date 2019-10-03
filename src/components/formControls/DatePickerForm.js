import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const DatePickerForm = ({ error, name, handleChange, value, ...props }) => (
  <Fragment>
    <DatePicker
      value={value}
      onChange={(date) => {
        const currentDateValue = date
          ? moment(date).format('YYYY.MM.DD')
          : null;
        handleChange(name, currentDateValue);
      }}
      style={{ width: '100%' }}
      {...props}
    />
    <div>{error && <span className="error">{error}</span>}</div>
  </Fragment>
);

DatePickerForm.propTypes = {
  error: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.shape({}),
};

export default DatePickerForm;
