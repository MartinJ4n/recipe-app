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
  const actions = {
    signUp: "signUp",
    signIn: "signIn",
    resendVerificationCode: "resendVerificationCode",
    forgotPassword: "forgotPassword",
    resetPassword: "resetPassword",
  };
  const {
    signUp,
    signIn,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
  } = actions;

  const [authSteps, setAuthStep] = useState([
    { name: "Sign Up", identity: signUp, selected: false },
    { name: "Sign In", identity: signIn, selected: true },
    {
      name: "Resend Verification Code",
      identity: resendVerificationCode,
      selected: false,
    },
    {
      name: "Forgot Password",
      identity: forgotPassword,
      selected: false,
    },
    {
      name: "Reset Password",
      identity: resetPassword,
      selected: false,
    },
  ]);
  const [newUser, setNewUser] = useState<null | ISignUpResult>(null);

  const dispatch = useAppDispatch();
  const {
    signUp: signUpState,
    signIn: signInState,
    resendVerificationCode: resendVerificationCodeState,
    forgotPassword: forgotPasswordState,
  } = useAppSelector((state) => state.events.auth.credentials);

  const inputCategories = {
    signUpEmail: "signUpEmail",
    signUpPassword: "signUpPassword",
    signUpRepeatPassword: "signUpRepeatPassword",
    signUpVerificationCode: "signUpVerificationCode",
    signInEmail: "signInEmail",
    signInPassword: "signInPassword",
    resendVerificationCodeEmail: "resendVerificationCodeEmail",
    forgotPasswordEmail: "forgotPasswordEmail",
    forgotPasswordVerificationCode: "forgotPasswordVerificationCode",
    forgotPasswordPassword: "forgotPasswordPassword",
    forgotPasswordRepeatPassword: "forgotPasswordRepeatPassword",
  };
  const selectedAuthStep = authSteps.find(
    ({ selected }) => selected === true
  )!.identity;

  /**
   * A basic 'selected' switch.
   * User switch between Sign In and Sign Up, and Resend Verification Code variants.
   */
  const handleAuthStep = (step: { identity: string }): void => {
    const updatedAuthStep = [...authSteps];

    for (const element of updatedAuthStep) {
      element.selected = false;
    }

    if (step.identity === signUp) {
      updatedAuthStep[0].selected = true;
      setAuthStep(updatedAuthStep);
      dispatch(clearCredentials());
    } else if (step.identity === signIn) {
      updatedAuthStep[1].selected = true;
      setAuthStep(updatedAuthStep);
      dispatch(clearCredentials());
    } else if (step.identity === resendVerificationCode) {
      updatedAuthStep[2].selected = true;
      setAuthStep(updatedAuthStep);
    } else if (step.identity === forgotPassword) {
      updatedAuthStep[3].selected = true;
      setAuthStep(updatedAuthStep);
    } else if (step.identity === resetPassword) {
      updatedAuthStep[4].selected = true;
      setAuthStep(updatedAuthStep);
    }
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
      resendVerificationCodeEmail,
      forgotPasswordEmail,
      forgotPasswordVerificationCode,
      forgotPasswordPassword,
      forgotPasswordRepeatPassword,
    } = inputCategories;
    if (type === signUpEmail) {
      dispatch(updateEmail(value, signUpEmail));
    } else if (type === signInEmail) {
      dispatch(updateEmail(value, signInEmail));
    } else if (type === signUpPassword) {
      dispatch(updatePassword(value, signUpPassword));
    } else if (type === signUpVerificationCode) {
      dispatch(updateVerificationCode(value, signUpVerificationCode));
    } else if (type === signInPassword) {
      dispatch(updatePassword(value, signInPassword));
    } else if (type === signUpRepeatPassword) {
      dispatch(updateRepeatPassword(value, signUpRepeatPassword));
    } else if (type === resendVerificationCodeEmail) {
      dispatch(updateEmail(value, resendVerificationCodeEmail));
    } else if (type === forgotPasswordEmail) {
      dispatch(updateEmail(value, forgotPasswordEmail));
    } else if (type === forgotPasswordVerificationCode) {
      dispatch(updateVerificationCode(value, forgotPasswordVerificationCode));
    } else if (type === forgotPasswordPassword) {
      dispatch(updatePassword(value, forgotPasswordPassword));
    } else if (type === forgotPasswordRepeatPassword) {
      dispatch(updateRepeatPassword(value, forgotPasswordRepeatPassword));
    }
  };

  /**
   * A simple 'password' and 'repeat password' validation.
   */
  const validatePassword = (): boolean => {
    return signUpState.password === signUpState.repeatPassword;
  };

  /**
   * Depending on the 'type', we either trigger the 'signUp' or 'signIn' method,
   * or trigger the verification code recovery.
   */

  const handleSubmit = async (type: string): Promise<any> => {
    if (type === signUp) {
      dispatch(initializeAuth());
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
      dispatch(initializeAuth());

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
    } else if (type === resendVerificationCode) {
      try {
        const newUser = await Auth.resendSignUp(
          resendVerificationCodeState.email
        );
        setNewUser(newUser);
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast(e.message);
        }
      }
    } else if (type === forgotPassword) {
      try {
        await Auth.forgotPassword(forgotPasswordState.email);

        handleAuthStep(authSteps[4]);
        toast("The password recovery code has been sent to you email.");
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast(e.message);
        }
      }
    } else if (type === resetPassword) {
      try {
        await Auth.forgotPasswordSubmit(
          forgotPasswordState.email,
          forgotPasswordState.verificationCode,
          forgotPasswordState.password
        );

        handleAuthStep(authSteps[1]);
        toast(
          "Your password has been successfully updated. Don't forget it this time. 😄"
        );
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast(e.message);
        }
      }
    }
  };

  /**
   * Once a user has signed up, the email needs to be confirmed in order to continue.
   * At the same time, we sign in a user if verification's gone smooth.
   */
  const handleEmailConfirmation = async (): Promise<any> => {
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

  /**
   * Otherwise, the verification code can be resent, but the user has to log in after verfication.
   */
  const handleEmailReconfirmation = async (): Promise<any> => {
    try {
      await Auth.confirmSignUp(
        resendVerificationCodeState.email,
        signUpState.verificationCode
      );

      setNewUser(null);
      handleAuthStep(authSteps[1]);

      toast("The email has been Confirmed.");
      dispatch(clearCredentials());
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast(e.message);
      }
    }
  };

  return (
    <Wrapper>
      {newUser === null ? (
        <AuthCard
          actions={actions}
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
          onConfirmationSubmit={
            signUpState.password.length !== 0
              ? handleEmailConfirmation
              : handleEmailReconfirmation
          }
        />
      )}
    </Wrapper>
  );
};

export default Authorization;
