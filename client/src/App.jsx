import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import CryptoPage from "./pages/CryptoPage";

function App() {
  return (
    <>
      <h1 className="underline">CryptoPulse</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:cryptoname" element={<CryptoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
