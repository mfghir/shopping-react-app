import { useState } from "react";
import "./App.css";
import "./common/animation.css";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import routes from "./routes";
import Home from "./components/Home";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const selectItemHandler = (id) => {
    setSelectedId(id);
    setShowCart(!showCart);
  };

  return (
    <main>
      <div className="App">
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectItemHandler={selectItemHandler}
                selectedId={selectedId}
                showCart={showCart}
                setShowCart={setShowCart}
              />
            }
          />

          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </main>
  );
}

export default App;
