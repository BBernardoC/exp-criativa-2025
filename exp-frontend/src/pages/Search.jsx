import "../styles/search.css";
import logo from "../public/logo.png";
import React, { useState } from "react";
import SnackbarError from "../components/SnackbarError";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Search() {
  const [errorMessage, setErrorMessage] = useState("");
  const [AIText, setAIText] = useState("");
  const [AITitle, setAITitle] = useState(""); 
  const [username, setUsername] = useState("Luis Mathias Rivabem Filho"); //TODO: Pegar username do back

  const handleSearch = async() => {
    const query = document.querySelector('input[placeholder="Digite Aqui Sua Dúvida"]').value;

    if (!query) {
      setErrorMessage("Nada digitado.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/gemini-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: query }) // Envia a consulta como 'prompt'
      });

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setAITitle(data.title || "Resultado da Sua Dúvida"); // Define AITitle com o título retornado
        setAIText(data.text);
      }

    } catch (error) {
      console.error('Erro ao chamar o backend:', error);
      setErrorMessage('Erro ao consultar o backend.');
    }
  }

  return (
    <div>

      <SnackbarError
        error={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <div className="page-container">

          <img src={logo} alt="Logo" className="logo" />

      {AIText ? (
        <div className="card">
          <h1>
            {AITitle} {/* Exibe AITitle dinâmico */}
          </h1>
          <p>
            {AIText}
          </p>
        </div>
      ) : (
        <div>
        <h1 className="welcome-message">
          Bem Vindo {username}!
        </h1>
        <h2 className="subtitle-text">Como podemos ajudar sua saúde hoje</h2>
        </div>
      )}

        <div className="search-container"
          style={{ backgroundColor: AIText ? "#e8c7eb" : "#61d747" }}
          >
          <input type="text" placeholder="Digite Aqui Sua Dúvida" className="search-input"
          style={{ backgroundColor: AIText ? "#e8c7eb" : "#61d747" }}
          />
          <AutoAwesomeIcon onClick={handleSearch} />
        </div>

      </div>

      <footer className="footer-aviso">
        <a href="#">Aviso Legal</a>
      </footer>

    </div>
  );
}

export default Search;