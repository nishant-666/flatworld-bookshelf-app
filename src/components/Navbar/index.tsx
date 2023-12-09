import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div className="navbar-head">
      <ul className="navbar-list">
        <li onClick={() => navigate("/")} className="list-item">
          Add Books
        </li>
        <li onClick={() => navigate("/show-admin")} className="list-item">
          Find Books
        </li>
      </ul>
    </div>
  );
}
