import { Routes, Route } from "react-router-dom";
// Screens
import Home from "./screens/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
