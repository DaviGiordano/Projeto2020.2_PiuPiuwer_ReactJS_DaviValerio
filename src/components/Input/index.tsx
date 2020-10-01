import React, {InputHTMLAttributes} from 'react';

import { InputComponent } from './styles';
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
}
const Input: React.FC<InputProps> = ({...rest}) => {
  return (
      <InputComponent {...rest}>
          
      </InputComponent>

  );
}

export default Input;