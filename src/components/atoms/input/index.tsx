import type { InputProps } from '@types';

const Input = <T,>({ id, name, className, register, ...props }: InputProps<T>) => {
  return (
    <input
      id={id}
      {...(register && { ...register(name) })}
      {...props}
      className={className}
      autoComplete="off"
    />
  );
};

export default Input;
