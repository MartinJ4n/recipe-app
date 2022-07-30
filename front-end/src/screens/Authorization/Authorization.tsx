import { useState, FC, ReactElement } from "react";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateEmail,
  updatePassword,
  updateRepeatPassword,
  updateVerificationCode,
  clearCredentials,
  initializeAuth,
  accomplishAuth,
  terminateAuth,
  cleanLoading,
} from "../../store/slices/auth";

import AuthCard from "../../components/AuthCard";
import AuthConfirmation from "../../components/AuthConfirmation";

import { Wrapper } from "./styles";

/**
 * The core idea is to authorize users, either with existing credentials or with completely new ones.
 * In the case of the latter, we want to make sure the e-mail has been verified before we allow the new user in.
 *
 * Details:
 * The entire authorization is based around 'aws-amplify' ( handling connection with cognito ) and 'redux' ( handling internal authorization state and logic )
 */

const Authorization: FC = (): ReactElement => {
  const signUp = "signUp" as const;
  const signIn = "signIn" as const;
  const [authSteps, setAuthStep] = useState([
    { name: "Sign Up", identity: signUp, selected: false },
    { name: "Sign In", identity: signIn, selected: true },
  ]);
  const [newUser, setNewUser] = useState<null | ISignUpResult>(null);

  const dispatch = useAppDispatch();
  const { signUp: signUpState, signIn: signInState } = useAppSelector(
    (state) => state.events.auth.credentials
  );

  const inputCategories = {
    signUpEmail: "signUpEmail",
    signUpPassword: "signUpPassword",
    signUpRepeatPassword: "signUpRepeatPassword",
    signUpVerificationCode: "signUpVerificationCode",
    signInEmail: "signInEmail",
    signInPassword: "signInPassword",
  };
  const selectedAuthStep = authSteps.find(
    ({ selected }) => selected === true
  )!.identity;

  /**
   * A basic 'selected' switch.
   * By clicking on Auth card's tabs, a user switch between Sign In and Sign Up variants.
   */
  const handleAuthStep = (step: { identity: string }): void => {
    const updatedAuthStep = [...authSteps];

    for (const element of updatedAuthStep) {
      element.selected = false;
    }

    if (step.identity === signUp) {
      updatedAuthStep[0].selected = true;
      setAuthStep(updatedAuthStep);
    } else if (step.identity === signIn) {
      updatedAuthStep[1].selected = true;
      setAuthStep(updatedAuthStep);
    }

    dispatch(clearCredentials());
  };

  /**
   * A custom input's change handler.
   * Based on its 'type' we dispatch a specific update to the form 'values'.
   */
  const handleChange = (value: string, type: string): void => {
    const {
      signUpEmail,
      signUpPassword,
      signUpRepeatPassword,
      signUpVerificationCode,
      signInEmail,
      signInPassword,
    } = inputCategories;
    if (type === signUpEmail) {
      dispatch(updateEmail(value, signUpEmail));
    } else if (type === signInEmail) {
      dispatch(updateEmail(value, signInEmail));
    } else if (type === signUpPassword) {
      dispatch(updatePassword(value, signUpPassword));
    } else if (type === signUpVerificationCode) {
      dispatch(updateVerificationCode(value));
    } else if (type === signInPassword) {
      dispatch(updatePassword(value, signInPassword));
    } else if (type === signUpRepeatPassword) {
      dispatch(updateRepeatPassword(value));
    }
  };

  /**
   * A simple 'password' and 'repeat password' validation.
   */
  const validatePassword = (): boolean => {
    return signUpState.password === signUpState.repeatPassword;
  };

  /**
   * Depending on the 'type', we either trigger the 'signUp' or 'signIn' method.
   */
  const handleSubmit = async (type: string): Promise<any> => {
    dispatch(initializeAuth());

    if (type === signUp) {
      const validate = validatePassword();

      if (validate) {
        try {
          const newUser = await Auth.signUp({
            username: signUpState.email,
            password: signUpState.password,
          });
          setNewUser(newUser);
          dispatch(cleanLoading());
        } catch (e: unknown) {
          if (e instanceof Error) {
            toast(e.message);
            dispatch(terminateAuth());
          }
        }
      } else {
        toast("Password doesn't match.");
        dispatch(terminateAuth());
      }
    } else if (type === signIn) {
      try {
        await Auth.signIn(signInState.email, signInState.password);

        dispatch(accomplishAuth());
        dispatch(clearCredentials());
        toast("Logged in");
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast(e.message);
          dispatch(terminateAuth());
        }
      }
    }
  };

  /**
   * Once a user has signed up, the email needs to be confirmed in order to continue.
   * At the same time, we sign in a user if verification's gone smooth.
   */
  const handleConfirmationSubmit = async (): Promise<any> => {
    dispatch(initializeAuth());

    try {
      await Auth.confirmSignUp(signUpState.email, signUpState.verificationCode);
      await Auth.signIn(signUpState.email, signUpState.password);

      dispatch(accomplishAuth());
      dispatch(clearCredentials());
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast(e.message);
        dispatch(terminateAuth());
      }
    }
  };

  return (
    <Wrapper>
      {newUser === null ? (
        <AuthCard
          authSteps={authSteps}
          selectedAuthStep={selectedAuthStep}
          inputCategories={inputCategories}
          onAuthStep={handleAuthStep}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <AuthConfirmation
          inputCategories={inputCategories}
          onChange={handleChange}
          onConfirmationSubmit={handleConfirmationSubmit}
        />
      )}
    </Wrapper>
  );
};

export default Authorization;
