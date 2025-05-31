import { Link } from "react-router-dom";
import React from "react";
import "../styles/cadastro.css";
import InputField from "../components/InputField";
import DiseaseButton from "../components/DiseaseButton";
import logo from "../public/logo.png"; // Certifique-se de que o caminho está correto
const diseases = [
  "Alzheimer",
  "AVC",
  "Osteoporose",
  "Dor Lombar",
  "Hipertensão",
  "Colesterol Alto",
  "Diabetes tipo 2",
  "Refluxo",
  "Pneumonia",
  "Asma",
  "Desnutrição",
];

export default function Cadastro() {
  return (
    <div className="container">
      <header>
        <img src={logo} alt="Logo Remédio Claro" className="logo" />
      </header>

      <main>
        <h1>Welcome!</h1>
        <p className="subtitle">
          Nos conte mais sobre você e quais são suas principais dificuldades e
          problemas!
        </p>

        <div className="inputs">
          <InputField placeholder="Digite seu nome aqui" />
          <InputField placeholder="Digite sua idade aqui" />
          <InputField placeholder="Digite seu email aqui" />
          <InputField placeholder="Digite sua senha aqui" type="password" />
        </div>

        <div className="doencas">
          <p>Selecione as doenças que você tem:</p>
          <div className="botoes-doencas">
            {diseases.map((name) => (
              <DiseaseButton key={name} label={name} />
            ))}
          </div>
        </div>

        <div className="arrow-container">
          <Link to="/search" className="link">
            <button className="arrow-button">➔</button>
          </Link>
        </div>

        <footer>
          <div className="footer-aviso">
            <a href="#">Aviso Legal</a>
          </div>
          <br />
          <Link to="/" className="link">
            fazer login
          </Link>
        </footer>
      </main>
    </div>
  );
}
