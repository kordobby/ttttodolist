import {
  Children,
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
} from 'react';
import styled from 'styled-components';

interface InputLayoutProps {
  $isError?: boolean;
}

export interface InputProps extends HTMLAttributes<HTMLDivElement>, InputLayoutProps {
  label?: ReactNode;
  children: ReactElement;
}

function Input({ label, children, $isError, ...rest }: InputProps) {
  const child = Children.only(children);
  const id = child.props.id;

  return (
    <InputLayout {...rest} $isError={$isError}>
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        {cloneElement(child, {
          id,
          name: label,
          ...child.props,
        })}
      </div>
    </InputLayout>
  );
}

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {}

Input.TextField = forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <input ref={ref} {...props} />;
});

export default Input;

const InputLayout = styled.div<InputLayoutProps>`
  border-color: ${({ $isError }) => ($isError ? 'red' : 'black')};
  display: flex;
  gap: 5px;
`;
