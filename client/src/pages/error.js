import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <div>
        <h1>404</h1>
        <h3>
          Îmi pare rău, pagina pe care încerci să o accesezi nu a fost
          identificată
        </h3>
      </div>
      <Link to="/" className="btn">
        Înapoi acasă
      </Link>
    </div>
  );
}

export default Error;
