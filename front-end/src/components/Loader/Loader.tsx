import { FC, ReactElement } from "react";
import { AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import catLoader from "../../assets/animations/loader-cat.json";

import { Wrapper } from "./styles";

type LoaderProps = {
  isVisible: boolean;
};

/**
 * General purpose Loader. Based on 'isVisible' prop it smoothly appears and disappears from the screen.
 * Two main take aways when it comes to the Loader: Lottie files ( Tones of Animated Graphics ) and Framer motion ( React animations ).
 * Framer: https://www.framer.com/docs/
 * Lottie: https://lottiefiles.com/featured
 */

const Loader: FC<LoaderProps> = ({ isVisible }): ReactElement => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <Wrapper
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lottie animationData={catLoader} loop={true} autoPlay={true} />
          </Wrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default Loader;
