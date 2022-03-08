import { useState, useEffect, FC, ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateEmail,
  updatePassword,
  updateRepeatPassword,
  clearCredentials,
} from "../../store/slices/entry";

import Input from "../Input";

import {
  Wrapper,
  TabsContainer,
  Tab,
  MainContainer,
  SumbmitButton,
} from "./styles";

const EntryCard: FC = (): ReactElement => {
  const signUp = "signUp" as const;
  const signIn = "signIn" as const;
  const [tabs, setTabs] = useState([
    { name: "Sign Up", query: signUp, selected: false },
    { name: "Sign In", query: signIn, selected: false },
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { signUp: signUpState, signIn: signInState } = useAppSelector(
    (state) => state.events.entry.credentials
  );

  const step = searchParams.get("s");
  const inputCategories = {
    signUpEmail: "signUpEmail",
    signUpPassword: "signUpPassword",
    signUpRepeatPassword: "signUpRepeatPassword",
    signInEmail: "signInEmail",
    signInPassword: "signInPassword",
  };

  /**
   * Handle Tab selection based on 's' query param
   */
  useEffect(() => {
    const updatedTabs = [...tabs];

    for (const element of updatedTabs) {
      element.selected = false;
    }

    if (step === signUp) {
      updatedTabs[0].selected = true;
      setTabs(updatedTabs);
    } else if (step === signIn) {
      updatedTabs[1].selected = true;
      setTabs(updatedTabs);
    }
  }, [step]);

  /**
   * Custom Handlers:
   */
  const handleTabSwitch = (query: string) => {
    setSearchParams({ s: query });
    dispatch(clearCredentials());
  };

  const handleChange = (value: string, type: string) => {
    const {
      signUpEmail,
      signUpPassword,
      signUpRepeatPassword,
      signInEmail,
      signInPassword,
    } = inputCategories;
    if (type === signUpEmail) {
      dispatch(updateEmail(value, signUpEmail));
    } else if (type === signInEmail) {
      dispatch(updateEmail(value, signInEmail));
    } else if (type === signUpPassword) {
      dispatch(updatePassword(value, signUpPassword));
    } else if (type === signInPassword) {
      dispatch(updatePassword(value, signInPassword));
    } else if (type === signUpRepeatPassword) {
      dispatch(updateRepeatPassword(value));
    }
    return;
  };

  const handleValidate = (type: string) => {
    if (type === signUp) {
      const { email, password, repeatPassword } = signUpState;
      email.length > 0 && password.length > 0 && password === repeatPassword;
    } else if (type === signIn) {
      const { email, password } = signInState;
      email.length > 0 && password.length > 0;
    }
    return;
  };

  const handleSubmit = async (type: string) => {
    if (type === signUp) {
      try {
        const newUser = await Auth.signUp({
          username: signUpState.email,
          password: signUpState.password,
        });
        // setIsLoading(false);
        // setNewUser(newUser);
      } catch (e) {
        // onError(e);
        // setIsLoading(false);
      }
    } else if (type === signIn) {
      try {
        await Auth.signIn(signInState.email, signInState.password);
        toast("Logged in");
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast(e.message);
        }
      }
    }
    return;
  };

  return (
    <Wrapper>
      <TabsContainer>
        {tabs.map(({ name, query }, index) => (
          <Tab key={index}>
            <p onClick={() => handleTabSwitch(query)}>{name}</p>
          </Tab>
        ))}
      </TabsContainer>
      <MainContainer>
        {step === signUp && (
          <>
            <Input
              value={signUpState.email}
              name="email"
              type="text"
              category={inputCategories.signUpEmail}
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              value={signUpState.password}
              name="password"
              type="password"
              category={inputCategories.signUpPassword}
              placeholder="Password"
              onChange={handleChange}
            />
            <Input
              value={signUpState.repeatPassword}
              name="password-repeat"
              type="password"
              category={inputCategories.signUpRepeatPassword}
              placeholder="Repeat Password"
              onChange={handleChange}
            />
            <SumbmitButton onClick={() => handleSubmit(signUp)}>
              <p>Sign Up</p>
            </SumbmitButton>
          </>
        )}
        {step === signIn && (
          <>
            <Input
              value={signInState.email}
              name="email"
              type="text"
              category={inputCategories.signInEmail}
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              value={signInState.password}
              name="password"
              type="password"
              category={inputCategories.signInPassword}
              placeholder="Password"
              onChange={handleChange}
            />
            <SumbmitButton onClick={() => handleSubmit(signIn)}>
              <p>Sign In</p>
            </SumbmitButton>
          </>
        )}
      </MainContainer>
    </Wrapper>
  );
};

export default EntryCard;
