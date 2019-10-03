import React, { Fragment } from 'react';
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
    {error && <span className="error">{error}</span>}
  </Fragment>
);

export default DatePickerForm;
