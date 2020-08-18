import React from "react";
import Cookies from "universal-cookie";

const ProfileScreen = () => {
  const cookies = new Cookies();
  const firstName = cookies.get('firstName');
  const lastName = cookies.get('lastName');
  const email = cookies.get('email');
  const organization = cookies.get('organization');
  const points = cookies.get('points');
  const certificates = cookies.get('certificates');


  return (
    <div className="container">
      <h1>My Profile</h1>
      <ul className="list-group">
        <li className="list-group-item"><b>Name:</b> {firstName} {lastName}</li>
        <li className="list-group-item"><b>Email:</b> {email}</li>
        <li className="list-group-item"><b>Organization:</b> {organization}</li>
        <li className="list-group-item"><b>Total Points:</b> {points}</li>
        <li className="list-group-item"><b>Certificates:</b> {certificates}</li>
      </ul>
    </div>
  );
};

export default ProfileScreen;
