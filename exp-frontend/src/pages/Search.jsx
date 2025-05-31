import "../styles/search.css";
import logo from "../public/logo.png";
import InputField from "../components/InputField";
import { FaQuestionCircle } from "react-icons/fa";

function Search() {
  return (
    <div>
      <div className="page-container">
        <header className="header">
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="card">
          <h1>Problemas Paracetamol</h1>
          <p>
            Se você tomar uma dose maior do que a recomendada de paracetamol,
            pode causar dano grave ao fígado, que pode levar à falência hepática
            e até à morte, mesmo sem sintomas imediatos. Os sinais podem incluir
            náusea, dor abdominal, pele amarelada e confusão. Procure ajuda
            médica urgente se isso acontecer.
          </p>
        </main>

        <div className="button-container">
          <InputField
            className="duvida-button"
            placeholder="Digite Aqui Sua Dúvida🤞"
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
