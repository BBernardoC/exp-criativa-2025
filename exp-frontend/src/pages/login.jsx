import { Link } from "react-router-dom";
import logo from "../public/logo.png";
import React, { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin =() => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
      alert("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    //TODO: Adicionar chamada da API aqui
    
    window.location.href = "/search";
    setIsLoading(false);
  }

  return (
    <>
      <img src={logo} alt="Logo" className="logo" />

      <div className="login_container">
        <h1 className="login_title">Login</h1>

        <input type="email" id="email" placeholder="email" className="input_style" />
        <input
          type="password"
          id="senha"
          placeholder="senha"
          className="input_style"
        />

        <p className="link_cadastro">
          Ainda não possui cadastro?
          <a href="/cadastro">
            Clique aqui.
            </a>
        </p>

          <button className="botao"
          onClick={handleLogin}
          >
            {isLoading ? "Entrando..." : "Entrar"}
            </button>
      </div>
    </>
  );
}
