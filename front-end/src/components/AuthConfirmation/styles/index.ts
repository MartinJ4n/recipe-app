import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90vw;
  height: 50vh;
  border: 1px solid black;
  border-radius: 16px;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SumbmitButton = styled.button`
  width: 80%;
  height: 48px;
  background-color: black;
  outline: none;
  border: none;
  border-radius: 16px;

  & p {
    color: #ffffff;
    font-size: 14px;
    letter-spacing: 0.03125em;
  }
`;
