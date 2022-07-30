import { FC, ReactElement } from "react";
import { useAppSelector } from "../../store/hooks";

import Input from "../Input";

import { Wrapper, MainContainer, SumbmitButton } from "./styles";

type AuthConfirmationProps = {
  inputCategories: { signUpVerificationCode: string };
  onChange: (value: string, type: string) => void;
  onConfirmationSubmit: () => Promise<any>;
};

const AuthConfirmation: FC<AuthConfirmationProps> = ({
  inputCategories,
  onChange,
  onConfirmationSubmit,
}): ReactElement => {
  const { signUp: signUpState } = useAppSelector(
    (state) => state.events.auth.credentials
  );

  return (
    <Wrapper>
      <MainContainer>
        <Input
          value={signUpState.verificationCode}
          name="email"
          type="text"
          category={inputCategories.signUpVerificationCode}
          placeholder="Verification Code"
          onChange={onChange}
          onKeyPress={(e) => e.key === "Enter" && onConfirmationSubmit()}
        />
        <SumbmitButton onClick={onConfirmationSubmit}>
          <p>Verify</p>
        </SumbmitButton>
      </MainContainer>
    </Wrapper>
  );
};

export default AuthConfirmation;
