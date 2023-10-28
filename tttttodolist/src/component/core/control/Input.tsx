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

export interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: ReactElement;
}

function Input({ label, children, ...rest }: InputProps) {
  const child = Children.only(children);
  const id = child.props.id;

  return (
    <div {...rest}>
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        {cloneElement(child, {
          id,
          name: label,
          ...child.props,
        })}
      </div>
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {}

Input.TextField = forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <input ref={ref} {...props} />;
});

export default Input;
