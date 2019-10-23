import * as React from 'react';
import { Input } from 'antd';

export interface Props {
  error: string;
  type?: string;
  props?: object;
}

const InputForm: React.FC<Props> = ({
  error,
  type,
  ...props
}: Props): React.ReactElement => (
  <React.Fragment>
    <Input type={type} {...props} />
    {error && <span className="error">{error}</span>}
  </React.Fragment>
);

InputForm.defaultProps = {
  type: 'text',
};

export default InputForm;
