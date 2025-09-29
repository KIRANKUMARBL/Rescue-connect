import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

// Dummy data for approved agencies
const approvedAgencies = [
  {
    id: 1,
    agencyName: "Rapid Rescue",
    representativeName: "John Doe",
    email: "contact@rapidrescue.com",
    phone: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    resources: {
      Ambulances: 2,
      "Rescue Personnel": 5,
      "Food Supplies": 20,
    },
  },
  {
    id: 2,
    agencyName: "Lifeline Aid",
    representativeName: "Jane Smith",
    email: "info@lifelineaid.org",
    phone: "9123456780",
    city: "Delhi",
    state: "Delhi",
    resources: {
      Trucks: 3,
      "Medical Staff": 4,
      "Water Supplies": 30,
    },
  },
];

const VolunteerPage = () => {
  const { logout } = useAuth();
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    // Fetch approved agencies from backend here
    // For now, using dummy data
    setAgencies(approvedAgencies);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full shadow flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">RescueConnect Volunteer</span>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-8">Approved Agencies</h1>
        {agencies.length === 0 ? (
          <p>No approved agencies available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <div
                key={agency.id}
                className="border rounded-2xl p-6 shadow flex flex-col justify-between"
              >
                <h2 className="font-bold text-lg mb-2">{agency.agencyName}</h2>
                <p>
                  <span className="font-medium">Representative:</span>{" "}
                  {agency.representativeName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {agency.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {agency.phone}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {agency.city}, {agency.state}
                </p>
                <p className="mt-2 font-medium">Resources:</p>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(agency.resources).map(([res, count]) => (
                    <li key={res}>
                      {res}: {count}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl"
                  onClick={() =>
                    alert(`You expressed interest to volunteer with ${agency.agencyName}`)
                  }
                >
                  Volunteer
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default VolunteerPage;
