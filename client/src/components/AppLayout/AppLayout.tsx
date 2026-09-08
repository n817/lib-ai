import { Outlet } from "react-router";

import Header from "../Header/Header";

import "./AppLayout.css";

export default function AppLayout() {
 return (
   <div className="app-layout">
     <Header />
       <main className="app-layout__main">
         <Outlet />
       </main>
   </div>
   );
}
