import { useNavigate } from "react-router";

import Logo from "../../assets/logo.svg";
import CardIcon1 from "../../assets/intro-icon-1.png";
import CardIcon2 from "../../assets/intro-icon-2.png";
import CardIcon3 from "../../assets/intro-icon-3.png";

import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <h1 className="intro__title">
        Welcome to LibAI <img src={Logo} alt="" className="intro__logo" />
      </h1>
      <ul className="intro__cards">
        <li className="intro__card">
          <img src={CardIcon1} alt="" className="intro__card-icon" />
          <p className="intro__card-text">
            <span>1. Upload Your Documents</span> Add your books, notes, manuals, and other PDF documents to your library.
          </p>
        </li>
        <li className="intro__card">
          <img src={CardIcon2} alt="" className="intro__card-icon" />
          <p className="intro__card-text">
            <span>2. Let AI Process Them</span> LibAI processes your documents and prepares them for intelligent search.
          </p>
        </li>
        <li className="intro__card">
          <img src={CardIcon3} alt="" className="intro__card-icon" />
          <p className="intro__card-text">
             <span>3. Ask AI</span> Ask questions in a simple chat and get answers based on the information in your documents.
          </p>
        </li>
      </ul>
      <p className="intro__cta">
        Start by building your personal knowledge library.
      </p>
      <button
        type="button"
        className="intro__start-btn"
        onClick={() => navigate("/library")}
      >
        Start
      </button>
    </div>
  );
}
