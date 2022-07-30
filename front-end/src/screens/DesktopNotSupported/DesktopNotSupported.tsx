import { FC, ReactElement } from "react";
import Lottie from "lottie-react";
import DripCoffee from "../../assets/animations/drip-coffee.json";

import { Wrapper } from "./styles";

const DesktopNotSupported: FC = (): ReactElement => {
  return (
    <Wrapper>
      <p>
        Grab your Coffee &#38; Mobile. <br /> Desktop not yet supported.
      </p>
      <Lottie animationData={DripCoffee} loop={true} autoPlay={true} />
    </Wrapper>
  );
};

export default DesktopNotSupported;
