import "../styles/search.css";
import logo from "../public/logo.png";
import React, { useState } from "react";
import SnackbarError from "../components/SnackbarError";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Search() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    const query = document.querySelector('input[placeholder="Digite Aqui Sua Dúvida"]').value;

    if (!query) {
      setErrorMessage("Nada digitado.");
      return;
    }

    //TODO: Implementar a lógica do gepeto
  }

  return (
    <div>

      <SnackbarError
        error={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <div className="page-container">

          <img src={logo} alt="Logo" className="logo" />

        <div className="card">
          <h1>Problemas Paracetamol</h1>
          <p>
            Se você tomar uma dose maior do que a recomendada de paracetamol,
            pode causar dano grave ao fígado, que pode levar à falência hepática
            e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir
            náusea, dor abdominal, pele amarelada e confusão. Procure ajuda
            médica urgente se isso acontecer.
            Se você tomar uma dose maior do que a recomendada de paracetamol,
            pode causar dano grave ao fígado, que pode levar à falência hepática
            e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir
            náusea, dor abdominal, pele amarelada e confusão. Procure ajuda
            médica urgente se isso acontecer.
            Se você tomar uma dose maior do que a recomendada de paracetamol,
            pode causar dano grave ao fígado, que pode levar à falência hepática
            e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir
            náusea, dor abdominal, pele amarelada e confusão. Procure ajuda
            médica urgente se isso acontecer.
            Se você tomar uma dose maior do que a recomendada de paracetamol,
            pode causar dano grave ao fígado, que pode levar à falência hepática
            e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir
            náusea, dor abdominal, pele amarelada e confusão. Procure ajuda
            médica urgente se isso acontecer.
            
          </p>
        </div>

        <div className="search-container">
          <input type="text" placeholder="Digite Aqui Sua Dúvida" className="search-input" />
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
