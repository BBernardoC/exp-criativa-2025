import { Link } from "react-router-dom";
import React from "react";
import "../styles/cadastro.css";
import InputField from "../components/InputField";
import DiseaseButton from "../components/DiseaseButton";
import logo from "../public/logo.png"; 

export default function Cadastro() {
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

  const handleCadastro = () => {
    const name = document.querySelector('input[placeholder="Digite seu nome aqui"]').value;
    const age = document.querySelector('input[placeholder="Digite sua idade aqui"]').value;
    const email = document.querySelector('input[placeholder="Digite seu email aqui"]').value;
    const password = document.querySelector('input[placeholder="Digite sua senha aqui"]').value;

    if (!name || !age || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    window.location.href = "/search";
  }

  return (
    <div className="screen_container">
        <img src={logo} alt="Logo Remédio Claro" className="logo" />

      <div className="main_container">
        <h1 className="screen_title">Welcome!</h1>
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
            <button className="arrow-button" onClick={handleCadastro}>➔</button>
        </div>

        <footer>
          <div className="footer-aviso">
            <a href="#">Aviso Legal</a>
          </div>
          <br />
          <a href="/" className="login-link">
            Voltar para página de login
          </a>
        </footer>
      </div>
    </div>
  );
}
