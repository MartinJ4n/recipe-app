import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
`;
