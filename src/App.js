import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={""} />
        <Route path="/habitos" element={""} />
        <Route path="/hoje" element={""} />
        <Route path="/historico" element={""} />
      </Routes>
    </BrowserRouter>

  );
}