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

    resendVerificationCode: {
      email: string;
    };

    forgotPassword: {
      email: string;
      verificationCode: string;
      password: string;
      repeatPassword: string;
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

  resendVerificationCode: {
    email: "",
  },

  forgotPassword: {
    email: "",
    verificationCode: "",
    password: "",
    repeatPassword: "",
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

    resendVerificationCodeEmailUpdated: (auth, action) => {
      auth.credentials.resendVerificationCode.email = action.payload;
    },

    forgotPasswordEmailUpdated: (auth, action) => {
      auth.credentials.forgotPassword.email = action.payload;
    },

    forgotPasswordVerificationCodeUpdated: (auth, action) => {
      auth.credentials.forgotPassword.verificationCode = action.payload;
    },

    forgotPasswordPasswordUpdated: (auth, action) => {
      auth.credentials.forgotPassword.password = action.payload;
    },

    forgotPasswordRepeatPasswordUpdated: (auth, action) => {
      auth.credentials.forgotPassword.repeatPassword = action.payload;
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
  resendVerificationCodeEmailUpdated,
  forgotPasswordEmailUpdated,
  forgotPasswordVerificationCodeUpdated,
  forgotPasswordPasswordUpdated,
  forgotPasswordRepeatPasswordUpdated,
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
  (value: string, type: string) => (dispatch: Dispatch) => {
    if (type === "signUpEmail") {
      dispatch(singUpEmailUpdated(value));
    } else if (type === "signInEmail") {
      dispatch(singInEmailUpdated(value));
    } else if (type === "resendVerificationCodeEmail") {
      dispatch(resendVerificationCodeEmailUpdated(value));
    } else if (type === "forgotPasswordEmail") {
      dispatch(forgotPasswordEmailUpdated(value));
    }
  };

export const updatePassword =
  (value: string, type: string) => (dispatch: Dispatch) => {
    if (type === "signUpPassword") {
      dispatch(signUpPasswordUpdated(value));
    } else if (type === "signInPassword") {
      dispatch(singInPasswordUpdated(value));
    } else if (type === "forgotPasswordPassword") {
      dispatch(forgotPasswordPasswordUpdated(value));
    }
  };

export const updateRepeatPassword =
  (value: string, type: string) => (dispatch: Dispatch) => {
    if (type === "signUpRepeatPassword") {
      dispatch(signUpRepeatPasswordUpdated(value));
    } else if (type === "forgotPasswordRepeatPassword") {
      dispatch(forgotPasswordRepeatPasswordUpdated(value));
    }
  };

export const updateVerificationCode =
  (value: string, type: string) => (dispatch: Dispatch) => {
    if (type === "signUpVerificationCode") {
      dispatch(signUpVerificationCodeUpdated(value));
    } else if (type === "forgotPasswordVerificationCode") {
      dispatch(forgotPasswordVerificationCodeUpdated(value));
    }
  };

export const submitCredentials = () => (dispatch: Dispatch) => {
  dispatch(credentialsCleared());
};

export const clearCredentials = () => (dispatch: Dispatch) => {
  dispatch(credentialsCleared());
};

export default authSlice.reducer;
