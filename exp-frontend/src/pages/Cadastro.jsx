import React, { useState } from "react";
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

  const handleCadastro = async () => {
    const name = document.querySelector(
      'input[placeholder="Digite seu nome aqui"]'
    ).value;
    const age = document.querySelector(
      'input[placeholder="Digite sua idade aqui"]'
    ).value;
    const email = document.querySelector(
      'input[placeholder="Digite seu email aqui"]'
    ).value;
    const password = document.querySelector(
      'input[placeholder="Digite sua senha aqui"]'
    ).value;

    // Obter as doenças selecionadas
    const selectedDiseases = Array.from(
      document.querySelectorAll(".disease-button.selected")
    )
      .map((el) => el.innerText)
      .join(", "); // envia como string separada por vírgulas

    if (!name || !age || !email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          user_age: age,
          user_dissease: selectedDiseases,
          user_email: email,
          user_password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar usuário.");
      }

      // Redireciona em caso de sucesso
      window.location.href = "/search";
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="screen_container">
      <SnackbarError error={errorMessage} onClose={() => setErrorMessage("")} />

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
          <input type="password" placeholder="Digite sua senha aqui" />
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
          <button className="arrow-button" onClick={handleCadastro}>
            ➔
          </button>
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
