import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle";
import { AllHabitsContext } from "./Contexts/AllHabitsContext";
import { LoginContext } from "./Contexts/LoginContext";
import HabitsPage from "./pages/HabitsPage";
import HistoricPage from "./pages/HistoricPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodayPage from "./pages/TodayPage";

export default function App() {
  const [user, setUser] = useState({id: null, name: null, image: null, email: null, password: null, token: null, progess: null, todayHabits: null, todayHabitsDone: null, allHabits: null, change: false})
  const [allHabits, setAllHabits] = useState({size:0})
  return (
    <BrowserRouter>
      <GlobalStyle />
      <LoginContext.Provider value={{ user, setUser }}>
        <AllHabitsContext.Provider value={{allHabits, setAllHabits}}>
          <Routes>
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/hoje" element={<TodayPage />} />
            <Route path="/historico" element={<HistoricPage />} />
          </Routes>
        </AllHabitsContext.Provider>
      </LoginContext.Provider>
    </BrowserRouter>

  );
}