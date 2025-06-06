import logo from "../public/logo.png";
import React, { useState } from "react";
import SnackbarError from "../components/SnackbarError";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_password: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login.");
      }

      // Armazena o token no localStorage
      localStorage.setItem("token", data.token);

      // Redireciona para a rota /search
      window.location.href = "/search";
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SnackbarError error={errorMessage} onClose={() => setErrorMessage("")} />

      <img src={logo} alt="Logo" className="logo" />

      <div className="login_container">
        <h1 className="login_title">Login</h1>

        <input
          type="email"
          id="email"
          placeholder="email"
          className="input_style"
        />
        <input
          type="password"
          id="senha"
          placeholder="senha"
          className="input_style"
        />

        <p className="link_cadastro">
          Ainda não possui cadastro?
          <a href="/cadastro">Clique aqui.</a>
        </p>

        <button className="botao" onClick={handleLogin}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </>
  );
}
