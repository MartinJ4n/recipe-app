import { Routes, Route } from "react-router-dom";
// Screens
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
