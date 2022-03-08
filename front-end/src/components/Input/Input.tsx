import { FC, ReactElement } from "react";

import { Wrapper, InputSC } from "./styles";

interface InputProps {
  value: string;
  name: string;
  type: string;
  category: string;
  label?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string, category: string) => void;
}

const Input: FC<InputProps> = ({
  value,
  name,
  type,
  category,
  label,
  width = "80%",
  height = "48px",
  placeholder = "...",
  disabled = false,
  onChange,
}): ReactElement => {
  return (
    <Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <InputSC
        value={value}
        name={name}
        type={type}
        width={width}
        height={height}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value, category)}
      />
    </Wrapper>
  );
};

export default Input;
