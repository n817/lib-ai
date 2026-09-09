import { NavLink } from "react-router";
import Logo from "../../assets/logo.svg";

import "./Header.css";

export default function Header() {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
      ? "header__nav-link header__nav-link_active"
      : "header__nav-link";
  }

  return (
    <header className="header">
      <img src={Logo} alt="bioAI logo" className="header__logo" />
      <nav className="header__nav">
        <NavLink to="/knowledge-base" className={getNavLinkClass}>
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={getNavLinkClass}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}
