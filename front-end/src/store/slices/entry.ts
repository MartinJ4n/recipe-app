import { createSlice } from "@reduxjs/toolkit";

interface EntryState {
  credentials: {
    signUp: {
      email: string;
      password: string;
      repeatPassword: string;
    };
    signIn: {
      email: string;
      password: string;
    };
  };
  loading: boolean;
}

const defaultCredentials = {
  signUp: {
    email: "",
    password: "",
    repeatPassword: "",
  },
  signIn: {
    email: "",
    password: "",
  },
};

const initialState: EntryState = {
  credentials: defaultCredentials,
  loading: false,
};

export const counterSlice = createSlice({
  name: "entry",
  initialState,

  reducers: {
    singUpEmailUpdated: (entry, action) => {
      entry.credentials.signUp.email = action.payload;
    },
    signUpPasswordUpdated: (entry, action) => {
      entry.credentials.signUp.password = action.payload;
    },
    signUpRepeatPasswordUpdated: (entry, action) => {
      entry.credentials.signUp.repeatPassword = action.payload;
    },

    singInEmailUpdated: (entry, action) => {
      entry.credentials.signIn.email = action.payload;
    },
    singInPasswordUpdated: (entry, action) => {
      entry.credentials.signIn.password = action.payload;
    },

    credentialsCleared: (entry, action) => {
      entry.credentials = defaultCredentials;
    },
  },
});

export const {
  singUpEmailUpdated,
  signUpPasswordUpdated,
  signUpRepeatPasswordUpdated,
  singInEmailUpdated,
  singInPasswordUpdated,
  credentialsCleared,
} = counterSlice.actions;

/**
 * Action Creators:
 */
export const updateEmail =
  (value: string, stage: string) =>
  //@ts-ignore
  (dispatch, getState) => {
    if (stage === "signUpEmail") {
      dispatch(singUpEmailUpdated(value));
    } else if (stage === "signInEmail") {
      dispatch(singInEmailUpdated(value));
    }
  };

export const updatePassword =
  (value: string, stage: string) =>
  //@ts-ignore
  (dispatch, getState) => {
    if (stage === "signUpPassword") {
      dispatch(signUpPasswordUpdated(value));
    } else if (stage === "signInPassword") {
      dispatch(singInPasswordUpdated(value));
    }
  };

export const updateRepeatPassword =
  (value: string) =>
  //@ts-ignore
  (dispatch, getState) => {
    dispatch(signUpRepeatPasswordUpdated(value));
  };

//@ts-ignore
export const submitCredentials = () => (dispatch, getState) => {
  dispatch(credentialsCleared(""));
};

//@ts-ignore
export const clearCredentials = () => (dispatch, getState) => {
  dispatch(credentialsCleared(""));
};

export default counterSlice.reducer;
