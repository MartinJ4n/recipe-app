import { FC, ReactElement } from "react";
import { useAppSelector } from "../../store/hooks";

import Input from "../Input";

import {
  Wrapper,
  TabsContainer,
  Tab,
  MainContainer,
  SumbmitButton,
} from "./styles";

type AuthCardProps = {
  authSteps: { name: string; identity: string }[];
  selectedAuthStep: string;
  inputCategories: {
    signUpEmail: string;
    signUpPassword: string;
    signUpRepeatPassword: string;
    signInEmail: string;
    signInPassword: string;
  };
  onAuthStep: (step: { identity: string }) => void;
  onChange: (value: string, type: string) => void;
  onSubmit: (type: string) => void;
};

const AuthCard: FC<AuthCardProps> = ({
  authSteps,
  selectedAuthStep,
  inputCategories,
  onAuthStep,
  onChange,
  onSubmit,
}): ReactElement => {
  const signUp = "signUp" as const;
  const signIn = "signIn" as const;
  const { signUp: signUpState, signIn: signInState } = useAppSelector(
    (state) => state.events.auth.credentials
  );

  return (
    <Wrapper>
      <TabsContainer>
        {authSteps.map((step, index) => (
          <Tab key={index}>
            <p onClick={() => onAuthStep(step)}>{step.name}</p>
          </Tab>
        ))}
      </TabsContainer>
      <MainContainer>
        {selectedAuthStep === signUp && (
          <>
            <Input
              value={signUpState.email}
              name="email"
              type="text"
              category={inputCategories.signUpEmail}
              placeholder="Email"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(signUp)}
            />
            <Input
              value={signUpState.password}
              name="password"
              type="password"
              category={inputCategories.signUpPassword}
              placeholder="Password"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(signUp)}
            />
            <Input
              value={signUpState.repeatPassword}
              name="password-repeat"
              type="password"
              category={inputCategories.signUpRepeatPassword}
              placeholder="Repeat Password"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(signUp)}
            />
            <SumbmitButton onClick={() => onSubmit(signUp)}>
              <p>Sign Up</p>
            </SumbmitButton>
          </>
        )}
        {selectedAuthStep === signIn && (
          <>
            <Input
              value={signInState.email}
              name="email"
              type="text"
              category={inputCategories.signInEmail}
              placeholder="Email"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(signIn)}
            />
            <Input
              value={signInState.password}
              name="password"
              type="password"
              category={inputCategories.signInPassword}
              placeholder="Password"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(signIn)}
            />
            <SumbmitButton onClick={() => onSubmit(signIn)}>
              <p>Sign In</p>
            </SumbmitButton>
          </>
        )}
      </MainContainer>
    </Wrapper>
  );
};

export default AuthCard;
