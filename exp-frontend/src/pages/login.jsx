import { Link } from "react-router-dom";
import logo from "../public/logo.png"; // Certifique-se de que o caminho está correto

export default function Login() {
  return (
    <>
      <img src={logo} alt="Logo" className="logo" />

      <div className="login">
        <h1 className="h1">Login</h1>
        <input type="email" id="email" placeholder="email" className="input" />
        <input
          type="password"
          id="senha"
          placeholder="senha"
          className="input"
        />
        <p>
          Ainda não possui cadastro?{" "}
          <Link to="/cadastro" className="link">
            clique aqui
          </Link>
        </p>
        <Link to="/search" className="link">
          <button className="botao">Entrar</button>
        </Link>
      </div>
    </>
  );
}
