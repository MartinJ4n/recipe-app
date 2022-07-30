import { FC, ReactElement, KeyboardEvent } from "react";

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
  onKeyPress?: (e: KeyboardEvent) => void;
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
  onKeyPress,
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
        onKeyPress={onKeyPress ? (e) => onKeyPress(e) : undefined}
      />
    </Wrapper>
  );
};

export default Input;
