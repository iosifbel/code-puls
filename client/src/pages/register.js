import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h1>Register Page</h1>
      <h3>
        Ai deja cont un?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </h3>
    </div>
  );
}

export default Register;
