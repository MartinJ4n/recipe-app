import { useEffect, FC, ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import EntryCard from "../../components/EntryCard";

import { Wrapper } from "./styles";

const Entry: FC = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("s");
  /**
   * If no query defined, redirect to the Sign Up
   */
  useEffect(() => {
    if (!step) {
      setSearchParams({ s: "signUp" });
    }
  }, [step]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Wrapper>{step && <EntryCard />}</Wrapper>
    </>
  );
};

export default Entry;
