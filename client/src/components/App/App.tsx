import "./App.css";
import { Route, Routes } from "react-router";

import Intro from "../../pages/Intro/Intro";
import AppLayout from "../AppLayout/AppLayout";
import KnowledgeBase from "../../pages/KnowledgeBase/KnowledgeBase";
import Chat from "../../pages/Chat/Chat";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route element={<AppLayout />}>
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
