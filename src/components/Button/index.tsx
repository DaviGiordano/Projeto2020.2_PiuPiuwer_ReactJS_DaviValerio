import React, { ButtonHTMLAttributes } from 'react';

import { ButtonComponent } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: React.FC<ButtonProps> = ({title, ...rest}) => {
return <ButtonComponent>{title}</ButtonComponent>;
};

export default Button;