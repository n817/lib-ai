import { NavLink } from "react-router";
import Logo from "../../assets/logo.svg";

import "./Header.css";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({
  onMenuOpen,
  onMenuClose,
  isMobileMenuOpen,
}: Props) {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
      ? "header__nav-link header__nav-link_active"
      : "header__nav-link";
  }

  return (
    <header
      className={isMobileMenuOpen ? "header header_type_mobile" : "header"}
    >
      <button
        type="button"
        className="header__menu-btn"
        aria-label="Open menu"
        onClick={onMenuOpen}
      />
      <img src={Logo} alt="bioAI logo" className="header__logo" />
      <nav className={isMobileMenuOpen ? "header__nav header__nav_type_mobile" : "header__nav"}>
        <NavLink
          to="/knowledge-base"
          className={getNavLinkClass}
          onClick={onMenuClose}
        >
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={getNavLinkClass} onClick={onMenuClose}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}
