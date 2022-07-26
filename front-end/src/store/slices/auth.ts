import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface AuthState {
  authorized: boolean;
  credentials: {
    signUp: {
      email: string;
      password: string;
      repeatPassword: string;
      verificationCode: string;
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
    verificationCode: "",
  },

  signIn: {
    email: "",
    password: "",
  },
};

const initialState: AuthState = {
  authorized: false,
  credentials: defaultCredentials,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authorizationInitialized: (auth) => {
      auth.loading = true;
    },

    authorizationSucceeded: (auth) => {
      auth.authorized = true;
      auth.loading = false;
    },

    authorizationFailed: (auth) => {
      auth.authorized = false;
      auth.loading = false;
    },

    loadingCleaned: (auth) => {
      auth.loading = false;
    },

    loggedOut: (auth) => {
      auth.authorized = false;
    },

    singUpEmailUpdated: (auth, action) => {
      auth.credentials.signUp.email = action.payload;
    },

    signUpPasswordUpdated: (auth, action) => {
      auth.credentials.signUp.password = action.payload;
    },

    signUpRepeatPasswordUpdated: (auth, action) => {
      auth.credentials.signUp.repeatPassword = action.payload;
    },

    signUpVerificationCodeUpdated: (auth, action) => {
      auth.credentials.signUp.verificationCode = action.payload;
    },

    singInEmailUpdated: (auth, action) => {
      auth.credentials.signIn.email = action.payload;
    },

    singInPasswordUpdated: (auth, action) => {
      auth.credentials.signIn.password = action.payload;
    },

    credentialsCleared: (auth) => {
      auth.credentials = defaultCredentials;
    },
  },
});

export const {
  authorizationInitialized,
  authorizationSucceeded,
  authorizationFailed,
  loadingCleaned,
  loggedOut,
  singUpEmailUpdated,
  signUpPasswordUpdated,
  signUpRepeatPasswordUpdated,
  signUpVerificationCodeUpdated,
  singInEmailUpdated,
  singInPasswordUpdated,
  credentialsCleared,
} = authSlice.actions;

/**
 * Action Creators:
 */
export const initializeAuth = () => (dispatch: Dispatch) => {
  dispatch(authorizationInitialized());
};

export const accomplishAuth = () => (dispatch: Dispatch) => {
  dispatch(authorizationSucceeded());
};

export const terminateAuth = () => (dispatch: Dispatch) => {
  dispatch(authorizationFailed());
};

export const cleanLoading = () => (dispatch: Dispatch) => {
  dispatch(loadingCleaned());
};

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(loggedOut());
};

export const updateEmail =
  (value: string, stage: string) => (dispatch: Dispatch) => {
    if (stage === "signUpEmail") {
      dispatch(singUpEmailUpdated(value));
    } else if (stage === "signInEmail") {
      dispatch(singInEmailUpdated(value));
    }
  };

export const updatePassword =
  (value: string, stage: string) => (dispatch: Dispatch) => {
    if (stage === "signUpPassword") {
      dispatch(signUpPasswordUpdated(value));
    } else if (stage === "signInPassword") {
      dispatch(singInPasswordUpdated(value));
    }
  };

export const updateRepeatPassword = (value: string) => (dispatch: Dispatch) => {
  dispatch(signUpRepeatPasswordUpdated(value));
};

export const updateVerificationCode =
  (value: string) => (dispatch: Dispatch) => {
    dispatch(signUpVerificationCodeUpdated(value));
  };

export const submitCredentials = () => (dispatch: Dispatch) => {
  dispatch(credentialsCleared());
};

export const clearCredentials = () => (dispatch: Dispatch) => {
  dispatch(credentialsCleared());
};

export default authSlice.reducer;
