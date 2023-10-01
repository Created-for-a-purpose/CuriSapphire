import React from "react";
import "../styles/components/UserData.scss";

function UserData({ name, age, bloodGroup, address, phoneNumber, email }) {
  return (
    <div className="user-table-container">
      <h2>User Information</h2>
      <table className="user-table">
        <tbody>
          <tr>
            <td className="user-table__label">Name</td>
            <td className="user-table__data">{name}</td>
          </tr>
          <tr>
            <td className="user-table__label">Age</td>
            <td className="user-table__data">{age}</td>
          </tr>
          <tr>
            <td className="user-table__label">Blood Group</td>
            <td className="user-table__data">{bloodGroup}</td>
          </tr>
          <tr>
            <td className="user-table__label">Address</td>
            <td className="user-table__data">{address}</td>
          </tr>
          <tr>
            <td className="user-table__label">Phone Number</td>
            <td className="user-table__data">{phoneNumber}</td>
          </tr>
          <tr>
            <td className="user-table__label">Email</td>
            <td className="user-table__data">{email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserData;
