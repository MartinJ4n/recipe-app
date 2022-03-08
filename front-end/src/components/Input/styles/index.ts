import styled, { css } from "styled-components";

interface InputSCProps {
  width: string;
  height: string;
}

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & label {
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.03125em;
    line-height: 1.28;
    margin-bottom: 8px;
  }
`;

export const InputSC = styled.input<InputSCProps>`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.03125em;
    background-color: transparent;
    outline: none;
    border: 1px solid black;
    border-radius: 16px;
    padding-left: 16px;

    &:focus {
      border: 2px solid gray;
    }
  `}
`;
