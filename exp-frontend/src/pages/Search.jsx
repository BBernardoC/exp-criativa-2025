import "../styles/search.css";
import logo from "../public/logo.png";
import React, { useState, useEffect } from "react";
import SnackbarError from "../components/SnackbarError";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Search() {
  const [errorMessage, setErrorMessage] = useState("");
  const [AIText, setAIText] = useState("");
  const [AITitle, setAITitle] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Verifica autenticação e busca nome do usuário
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/"; // Redireciona se não estiver logado
      return;
    }

    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:3000/user-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar nome do usuário.");
        }

        setUsername(data.user_name);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setErrorMessage("Erro ao carregar informações do usuário.");
      }
    };

    fetchUsername();
  }, []);

  // Faz consulta ao Gemini
  const handleSearch = async () => {
    if (!inputValue) {
      setErrorMessage("Nada digitado.");
      return;
    }

    setLoading(true);
    setAIText("");
    setInputValue("");

    try {
      const response = await fetch("http://localhost:3001/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setAITitle(data.title || "Resultado da Sua Dúvida");
        setAIText(data.text);
      }
    } catch (error) {
      console.error("Erro ao chamar o backend:", error);
      setErrorMessage("Erro ao consultar o backend.");
      setLoading(false);
    }
  };

  return (
    <div>
      <SnackbarError error={errorMessage} onClose={() => setErrorMessage("")} />

      <div className="page-container">
        <img src={logo} alt="Logo" className="logo" />

        {loading ? (
          <div className="card">
            <h1>
              <Skeleton />
            </h1>
            <p>
              <Skeleton count={5} />
            </p>
          </div>
        ) : AIText ? (
          <div className="card">
            <h1>{AITitle}</h1>
            <p>{AIText}</p>
          </div>
        ) : (
          <div>
            <h1 className="welcome-message">Bem-vindo {username}!</h1>
            <h2 className="subtitle-text">
              Como podemos ajudar sua saúde hoje?
            </h2>
          </div>
        )}

        <div
          className="search-container"
          style={{ backgroundColor: AIText || loading ? "#e8c7eb" : "#61d747" }}
        >
          <input
            id="ai-input"
            type="text"
            placeholder="Digite Aqui Sua Dúvida"
            className={`search-input ${loading ? "loading" : ""}`}
            style={{
              backgroundColor: AIText || loading ? "#e8c7eb" : "#61d747",
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <AutoAwesomeIcon
            onClick={handleSearch}
            style={{
              color: loading ? "white" : "black",
              transition: "color 0.3s",
            }}
          />
        </div>
      </div>

      <footer className="footer-aviso">
        <a href="#">Aviso Legal</a>
      </footer>
    </div>
  );
}

export default Search;
