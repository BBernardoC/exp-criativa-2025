import React, {useState} from "react";
import "../styles/cadastro.css";
import DiseaseButton from "../components/DiseaseButton";
import logo from "../public/logo.png"; 
import SnackbarError from "../components/SnackbarError";

export default function Cadastro() {
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    window.location.href = "/search";
  }

  return (
    <div className="screen_container">

      <SnackbarError
        error={errorMessage}
        onClose={() => setErrorMessage("")}
      />

        <img src={logo} alt="Logo Remédio Claro" className="logo" />

      <div className="main_container">
        <h1 className="screen_title">Welcome!</h1>
        <p className="subtitle">
          Nos conte mais sobre você e quais são suas principais dificuldades e
          problemas!
        </p>

        <div className="inputs">
          <input type="text" placeholder="Digite seu nome aqui" />
          <input type="text" placeholder="Digite sua idade aqui" />
          <input type="email" placeholder="Digite seu email aqui" />
          <input type="password" placeholder="Digite sua senha aqui"/>
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