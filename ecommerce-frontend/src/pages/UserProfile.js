import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <div className="mb-4">
        <label className="block text-gray-600">Username</label>
        <p className="text-gray-800">{user?.username}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Email</label>
        <p className="text-gray-800">{user?.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
