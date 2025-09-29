import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const dummyRequests = [
  {
    id: 1,
    agencyName: "Rapid Rescue",
    representativeName: "John Doe",
    email: "john@rescue.org",
    phone: "9876543210",
    city: "Bangalore",
    state: "Karnataka",
    resources: { Ambulances: 3, "Rescue Personnel": 12 },
    documents: ["license.pdf", "certification.pdf"],
    status: "Pending",
  },
  {
    id: 2,
    agencyName: "Coastal Help",
    representativeName: "Anita Singh",
    email: "anita@coastal.org",
    phone: "9123456780",
    city: "Chennai",
    state: "Tamil Nadu",
    resources: { "Rescue Boats": 4, "Medical Staff": 5 },
    documents: ["registration.pdf"],
    status: "Pending",
  },
];

const AdminPanel = () => {
  const [requests, setRequests] = useState(dummyRequests);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
  };

  const handleLogout = () => {
    // Call context logout (clears state). Also safe to clean localStorage.
    logout?.();
    localStorage.removeItem("user");
    navigate("/"); // redirect to login
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full shadow flex items-center justify-between px-8 py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <span className="text-lg font-bold">RescueConnect - Admin Panel</span>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-2xl font-medium hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Agency Verification Requests</h1>
        <div className="overflow-x-auto shadow rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Agency</th>
                <th className="p-3">Representative</th>
                <th className="p-3">Location</th>
                <th className="p-3">Resources</th>
                <th className="p-3">Documents</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{req.agencyName}</td>
                  <td className="p-3">
                    {req.representativeName}
                    <br />
                    <span className="text-sm text-gray-500">{req.email}</span>
                    <br />
                    <span className="text-sm text-gray-500">{req.phone}</span>
                  </td>
                  <td className="p-3">{req.city}, {req.state}</td>
                  <td className="p-3">
                    {Object.entries(req.resources).map(([key, val]) => (
                      <div key={key} className="text-sm">
                        {key}: <span className="font-medium">{val}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    {req.documents.map((doc, i) => (
                      <div key={i}>
                        <a href="#" className="text-blue-600 hover:underline">{doc}</a>
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-2xl text-sm font-medium ${
                      req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleAction(req.id, "Approved")}
                      className="bg-green-500 text-white px-4 py-1 rounded-2xl font-medium hover:bg-green-600 cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "Denied")}
                      className="bg-red-500 text-white px-4 py-1 rounded-2xl font-medium hover:bg-red-600 cursor-pointer"
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
