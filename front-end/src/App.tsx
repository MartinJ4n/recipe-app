import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Auth } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  authorizationInitialized,
  accomplishAuth,
  terminateAuth,
  cleanLoading,
} from "./store/slices/auth";
import useMediaQuery from "./utils/useMediaQuery";

// Components
import { AuthenticatedRoute, UnauthenticatedRoute } from "./components/Routes";
import Loader from "./components/Loader";

// Screens
import Authorization from "./screens/Authorization";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import DesktopNotSupported from "./screens/DesktopNotSupported";

const App = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.events.auth);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const handleSessionVerification = async () => {
    dispatch(authorizationInitialized());

    try {
      await Auth.currentSession();
      dispatch(accomplishAuth());
      toast("Logged In");
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
        dispatch(terminateAuth());
      }
    }

    dispatch(cleanLoading());
  };

  /**
   * Check the current session whether a user is signed in or not.
   * The effect is triggered only once, on page load.
   */
  useEffect(() => {
    handleSessionVerification();
  }, []);

  if (isDesktop) return <DesktopNotSupported />;
  return (
    <>
      <Loader isVisible={loading} />
      <ToastContainer theme="dark" autoClose={3000} />

      <Routes>
        <Route
          path="/auth"
          element={
            <UnauthenticatedRoute>
              <Authorization />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
