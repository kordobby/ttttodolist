import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}

export default Button;
