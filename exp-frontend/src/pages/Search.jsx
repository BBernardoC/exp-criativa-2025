import "../styles/search.css";
import logo from "../public/logo.png";
import React, { useState } from "react";
import SnackbarError from "../components/SnackbarError";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Search() {
  const [errorMessage, setErrorMessage] = useState("");
  const [AIText, setAIText] = useState("");
  const [username, setUsername] = useState("Luis Mathias Rivabem Filho"); //TODO: Pegar username do back

  const handleSearch = () => {
    mockAIResponse();
    const query = document.querySelector('input[placeholder="Digite Aqui Sua Dúvida"]').value;

    if (!query) {
      setErrorMessage("Nada digitado.");
      return;
    }

    //TODO: Implementar a lógica do gepeto
  }

  const mockAIResponse = () => {
    setAIText("Se você tomar uma dose maior do que a recomendada de paracetamol, pode causar dano grave ao fígado, que pode levar à falência hepática e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir náusea, dor abdominal, pele amarelada e confusão. Procure ajuda médica urgente se isso acontecer.Se você tomar uma dose maior do que a recomendada de paracetamol, pode causar dano grave ao fígado, que pode levar à falência hepática e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir náusea, dor abdominal, pele amarelada e confusão. Procure ajuda médica urgente se isso acontecer.Se você tomar uma dose maior do que a recomendada de paracetamol, pode causar dano grave ao fígado, que pode levar à falência hepática e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir náusea, dor abdominal, pele amarelada e confusão. Procure ajuda médica urgente se isso acontecer.")
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
            {/* Colocar aqui o titulo retornado pelo gepeto */}
            Problemas Paracetamol</h1>
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
