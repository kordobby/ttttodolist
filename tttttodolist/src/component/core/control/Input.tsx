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

export interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: ReactElement;
  error: boolean;
}

function Input({ label, children, error, ...rest }: InputProps) {
  const child = Children.only(children);
  const id = child.props.id;

  return (
    <InputLayout {...rest} error={error}>
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

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {}

Input.TextField = forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <input ref={ref} {...props} />;
});

export default Input;

const InputLayout = styled.div<{ error: boolean }>``;
