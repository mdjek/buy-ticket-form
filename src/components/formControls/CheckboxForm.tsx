import * as React from 'react';
import { Checkbox } from 'antd';

export interface Props {
  checked?: boolean;
  name?: string;
  label?: string;
  error?: string;
  handleChange: (name: string | undefined, e: boolean) => void;
}

const CheckboxForm: React.FC<Props> = ({
  checked,
  name,
  label,
  error,
  handleChange,
  ...props
}: Props): React.ReactElement => {
  return (
    <React.Fragment>
      <Checkbox
        checked={checked}
        name={name}
        {...props}
        onChange={(e) => handleChange(name, e.target.checked)}
      >
        {label}
      </Checkbox>
      <div>{error && <span className="error">{error}</span>}</div>
    </React.Fragment>
  );
};

export default CheckboxForm;
