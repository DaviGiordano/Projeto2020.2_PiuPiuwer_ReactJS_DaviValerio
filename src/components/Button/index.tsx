import React, { ButtonHTMLAttributes } from 'react';

import { ButtonComponent } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  buttonOpacity?:number;
}

const Button: React.FC<ButtonProps> = ({buttonOpacity, title, ...rest}) => {
return (
  <ButtonComponent  buttonOpacity={buttonOpacity || 1} {...rest} >
    {title}
  </ButtonComponent>
  
  );
};

export default Button;