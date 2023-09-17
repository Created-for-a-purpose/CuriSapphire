import "../styles/components/Sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar(params) {
  return (
    <>
      <div className="sidebar_container">
        <div className="sidebar_container__links">
            <Link className="sidebar_container__links__link" to={"/dashboard/user"}>User</Link>
            <div className="sidebar_container__links__link">Prescriptions</div>
            <Link className="sidebar_container__links__link" to = {"/dashboard/reports"}>Reports</Link>
            <div className="sidebar_container__links__link">Chat</div>
        </div>
      </div>
    </>
  );
}
