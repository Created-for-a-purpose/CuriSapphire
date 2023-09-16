import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserData from "../components/UserData"; // Import the UserData component
import "../styles/pages/UserDashboard.scss";

export default function UserDashboard() {
  // Sample user data
  const userData = {
    name: "John Doe",
    age: 30,
    bloodGroup: "A+",
    address: "123 Main St, City",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
  };

  return (
    <>
      <Navbar />
      <div className="user_dashboard_container">
        <Sidebar />
        <div className="user_dashboard_container__content">
          <div className="user_dashboard_container__content__data">
            {/* Pass the user data as props to the UserData component */}
            <UserData {...userData} />
          </div>
        </div>
      </div>
    </>
  );
}
