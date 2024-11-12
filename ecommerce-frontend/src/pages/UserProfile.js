import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    // Code to save the updated user details (address and phone)
    alert("User details saved successfully!");
  };

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
      <div className="mb-4">
        <label className="block text-gray-600">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 mt-4"
      >
        Save
      </button>
    </div>
  );
}

export default UserProfile;
