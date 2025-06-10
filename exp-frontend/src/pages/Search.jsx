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
  const [showModal, setShowModal] = useState(false);


  function formatarComNegrito(texto) {
    return texto
      .split('\n')
      .map((linha) => {
        let formatada = linha.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatada = formatada.replace(/^\s*\*\s*/, '• ');
        return formatada;
      })
      .join('<br>');
  }


  // Verifica autenticação e busca nome do usuário
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/"; // Redireciona se não estiver logado
      return;
    }

    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/info", {
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

    // Validação de tema permitido
    const termoPermitido = (text) => {
    const texto = text.toLowerCase();

    // Lista de palavras-chave médicas e nomes genéricos
    const termosChave = [
      "remédio", "remedios", "medicamento", "medicamentos",
      "bula", "tarja preta", "dosagem", "efeito colateral",
      "interação", "contraindicação", "genérico", "farmácia", "tratamento",
      "para que serve", "como tomar", "serve para", "efeitos colaterais", "posologia"
    ];

    const nomesComuns = [
      "dipirona", "paracetamol", "ibuprofeno", "amoxicilina", "azitromicina",
      "omeprazol", "nimesulida", "losartana", "dorflex", "cetirizina", "clonazepam",
      "rivotril", "metformina", "allegra", "loratadina"
    ];

    const padraoFarmaco = /\b[a-z]{5,}(ina|ol|am|azol|pril|pam|cilina|metina|cetina)\b/; // sufixos comuns de remédios

    const matchTermos = termosChave.some((termo) => texto.includes(termo));
    const matchNome = nomesComuns.some((nome) => texto.includes(nome));
    const matchPadrao = padraoFarmaco.test(texto);

    return matchTermos || matchNome || matchPadrao;
  };

    if (!termoPermitido(inputValue)) {
      setErrorMessage("O sistema responde apenas perguntas sobre medicamentos ou remédios.");
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
             <p dangerouslySetInnerHTML={{ __html: formatarComNegrito(AIText) }} />
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
        <a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
          Aviso Legal
        </a>
      </footer>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Aviso Legal</h2>
            <p>
              As informações fornecidas por este sistema são geradas por inteligência artificial e destinam-se apenas a fins informativos e educacionais.
              Elas <strong>não substituem orientação médica profissional, diagnóstico ou tratamento</strong>.
              Sempre consulte um profissional de saúde qualificado para qualquer dúvida relacionada à sua saúde ou medicação.
            </p>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
}



export default Search;
