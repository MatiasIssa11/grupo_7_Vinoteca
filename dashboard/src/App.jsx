import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";

import Home from "./pages/Home";
import User from "./pages/User";
import Product from "./pages/Product";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
