import { useState } from "react";
import { NavLink } from "react-router";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

import Logo from "../../assets/logo.svg";

export default function Register() {
  const [submitError, setSubmitError] = useState("");
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  return (
    <>
      <header className="header">
        <img src={Logo} alt="bioAI logo" className="header__logo" />
      </header>
      <form className="form" noValidate>
        <h1 className="form__title">Create account</h1>
        <p className="form__description">
          Access your organisation's secure workspace
        </p>
        <nav className="form__nav-links">
          <NavLink to="/login" className="form__nav-link">
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="form__nav-link form__nav-link_active"
          >
            Register
          </NavLink>
        </nav>
        <div className="form__input-container">
          <label className="form__label">
            Name
            <input
              className="form__input"
              name="name"
              type="name"
              required
              minLength={2}
              maxLength={40}
              value={values.name ?? ""}
              onChange={handleChange}
              placeholder="Name"
            />
          </label>
          {errors.name && <p className="form__error">{errors.name}</p>}
        </div>
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
              placeholder="password (8 characters or more)"
            />
          </label>
          {errors.password && <p className="form__error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={!isValid} className="form__submit-btn">
          Create account
        </button>
        {submitError && <p className="form__error">{submitError}</p>}
      </form>
    </>
  );
}
