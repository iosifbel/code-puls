import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <h1>Login Page</h1>
      <Link to="/" className="btn">
        Login
      </Link>
      <Link to="/register" className="btn">
        Creează cont
      </Link>
    </div>
  );
}

export default Login;
