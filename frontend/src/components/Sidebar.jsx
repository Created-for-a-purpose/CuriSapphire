import "../styles/components/Sidebar.scss";

export default function Sidebar(params) {
  return (
    <>
      <div className="sidebar_container">
        <div className="sidebar_container__links">
            <div className="sidebar_container__links__link">User</div>
            <div className="sidebar_container__links__link">Prescriptions</div>
            <div className="sidebar_container__links__link">Reports</div>
            <div className="sidebar_container__links__link">Chat</div>
        </div>
      </div>
    </>
  );
}
