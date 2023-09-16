import React from "react";
import "../styles/components/UserData.scss";

function UserData({ name, age, bloodGroup, address, phoneNumber, email }) {
  return (
    <div className="user-data">
      <h2>User Information</h2>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age}</td>
          </tr>
          <tr>
            <td>Blood Group</td>
            <td>{bloodGroup}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{phoneNumber}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserData;
