import React, {InputHTMLAttributes} from 'react';

import { InputComponent } from './styles';
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    isBig?:boolean;
}
const Input: React.FC<InputProps> = ({isBig, ...rest}) => {
  return (
      <InputComponent {...rest}>
          
      </InputComponent>

  );
}

export default Input;