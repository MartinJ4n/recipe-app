import { FC, ReactElement } from "react";
import { useAppSelector } from "../../store/hooks";

import Input from "../Input";

import {
  Wrapper,
  TabsContainer,
  Tab,
  MainContainer,
  SumbmitButton,
  DetailsBox,
} from "./styles";

type AuthCardProps = {
  actions: {
    signUp: string;
    signIn: string;
    resendVerificationCode: string;
    forgotPassword: string;
    resetPassword: string;
  };
  authSteps: { name: string; identity: string }[];
  selectedAuthStep: string;
  inputCategories: {
    signUpEmail: string;
    signUpPassword: string;
    signUpRepeatPassword: string;
    signInEmail: string;
    signInPassword: string;
    resendVerificationCodeEmail: string;
    forgotPasswordEmail: string;
    forgotPasswordVerificationCode: string;
    forgotPasswordPassword: string;
    forgotPasswordRepeatPassword: string;
  };
  onAuthStep: (step: { identity: string }) => void;
  onChange: (value: string, type: string) => void;
  onSubmit: (type: string) => void;
};

const AuthCard: FC<AuthCardProps> = ({
  actions,
  authSteps,
  selectedAuthStep,
  inputCategories,
  onAuthStep,
  onChange,
  onSubmit,
}): ReactElement => {
  const {
    signUp,
    signIn,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
  } = actions;
  const {
    signUp: signUpState,
    signIn: signInState,
    resendVerificationCode: resendVerificationCodeState,
    forgotPassword: forgotPasswordState,
  } = useAppSelector((state) => state.events.auth.credentials);

  return (
    <Wrapper>
      <TabsContainer>
        {authSteps.slice(0, 2).map((step, index) => (
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

            <DetailsBox>
              <p onClick={() => onAuthStep(authSteps[2])}>
                Resend Verification Code
              </p>
              <p onClick={() => onAuthStep(authSteps[3])}>Forgot Password</p>
            </DetailsBox>
          </>
        )}

        {selectedAuthStep === resendVerificationCode && (
          <>
            <Input
              value={resendVerificationCodeState.email}
              name="email"
              type="text"
              category={inputCategories.resendVerificationCodeEmail}
              placeholder="Email"
              onChange={onChange}
              onKeyPress={(e) =>
                e.key === "Enter" && onSubmit(resendVerificationCode)
              }
            />

            <SumbmitButton onClick={() => onSubmit(resendVerificationCode)}>
              <p>Resend the Verification code</p>
            </SumbmitButton>
          </>
        )}

        {selectedAuthStep === forgotPassword && (
          <>
            <Input
              value={forgotPasswordState.email}
              name="email"
              type="text"
              category={inputCategories.forgotPasswordEmail}
              placeholder="Email"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(forgotPassword)}
            />

            <SumbmitButton onClick={() => onSubmit(forgotPassword)}>
              <p>Send password recovery code</p>
            </SumbmitButton>
          </>
        )}

        {selectedAuthStep === resetPassword && (
          <>
            <Input
              value={forgotPasswordState.verificationCode}
              name="email"
              type="text"
              category={inputCategories.forgotPasswordVerificationCode}
              placeholder="Code"
              onChange={onChange}
            />
            <Input
              value={forgotPasswordState.password}
              name="password"
              type="password"
              category={inputCategories.forgotPasswordPassword}
              placeholder="New Password"
              onChange={onChange}
            />
            <Input
              value={forgotPasswordState.repeatPassword}
              name="password"
              type="password"
              category={inputCategories.forgotPasswordRepeatPassword}
              placeholder="Repeat Password"
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit(resetPassword)}
            />

            <SumbmitButton onClick={() => onSubmit(resetPassword)}>
              <p>Reset Password</p>
            </SumbmitButton>
          </>
        )}
      </MainContainer>
    </Wrapper>
  );
};

export default AuthCard;
