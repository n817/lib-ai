import { useState } from "react";
import { NavLink } from "react-router";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

import Logo from "../../assets/logo.svg";

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "form__nav-link form__nav-link_active" : "form__nav-link";
}

export default function Login() {
  const [submitError, setSubmitError] = useState("");
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  return (
    <>
      <header className="header">
        <img src={Logo} alt="bioAI logo" className="header__logo" />
      </header>
      <form className="form" noValidate>
        <h1 className="form__title">Sign in</h1>
        <p className="form__description">
          Access your organisation's secure workspace
        </p>
        <nav className="form__nav-links">
          <NavLink to="/login" className={getNavLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={getNavLinkClass}>
            Register
          </NavLink>
        </nav>
        <div className="form__input-container">
          <label className="form__label">
            Email
            <input
              className="form__input"
              name="email"
              type="email"
              required
              value={values.email ?? ""}
              onChange={handleChange}
              placeholder="email"
            />
          </label>
          {errors.email && <p className="form__error">{errors.email}</p>}
        </div>
        <div className="form__input-container">
          <label className="form__label">
            Password
            <input
              className="form__input"
              name="password"
              type="password"
              required
              minLength={8}
              value={values.password ?? ""}
              onChange={handleChange}
              placeholder="password"
            />
          </label>
          {errors.password && <p className="form__error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={!isValid} className="form__submit-btn">
          Log in
        </button>
        {submitError && <p className="form__error">{submitError}</p>}
      </form>
    </>
  );
}
