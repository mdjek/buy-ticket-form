import * as React from 'react';
import { Select } from 'antd';

export interface Props {
  name: string;
  error: string;
  handleChange: (name: string, e: string) => void;
  value: string;
  children: React.ReactNode | Array<React.ReactNode>;
  props: object;
}

const SelectForm: React.FC<Props> = ({
  error,
  name,
  children,
  handleChange,
  value,
  ...props
}: Props): React.ReactElement => {
  return (
    <React.Fragment>
      <Select
        value={value || undefined}
        onChange={(e: string) => handleChange(name, e)}
        {...props}
      >
        {children}
      </Select>
      {error && <span className="error">{error}</span>}
    </React.Fragment>
  );
};

export default SelectForm;
