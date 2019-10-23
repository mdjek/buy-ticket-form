import * as React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';

type currentDateValueType = string | null;

export interface Props {
  error: string;
  handleChange: (arg0: string, arg1: currentDateValueType) => void;
  name: string;
  value: Moment | undefined;
}

const DatePickerForm: React.FC<Props> = ({
  error,
  name,
  handleChange,
  value,
  ...props
}: Props): React.ReactElement => (
  <React.Fragment>
    <DatePicker
      value={value}
      onChange={(date) => {
        const currentDateValue: currentDateValueType = date
          ? moment(date).format('YYYY.MM.DD')
          : null;
        handleChange(name, currentDateValue);
      }}
      style={{ width: '100%' }}
      {...props}
    />
    <div>{error && <span className="error">{error}</span>}</div>
  </React.Fragment>
);

export default DatePickerForm;
