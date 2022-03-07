import { FC, ReactElement } from "react";
import Lottie from "lottie-react";
import ErrorDoodle from "../../assets/animations/error-doodle-animation.json";

import { Wrapper } from "./styles";

const NotFound: FC = (): ReactElement => {
  return (
    <Wrapper>
      <Lottie animationData={ErrorDoodle} loop={true} autoPlay={true} />
    </Wrapper>
  );
};

export default NotFound;
