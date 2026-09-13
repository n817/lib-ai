import "./App.css";
import { Route, Routes } from "react-router";

import Intro from "../../pages/Intro/Intro";
import AppLayout from "../AppLayout/AppLayout";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Library from "../../pages/Library/Library";
import Chat from "../../pages/Chat/Chat";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/library" element={<Library />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
