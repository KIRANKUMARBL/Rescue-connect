import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPannel";
import VolunteerPage from "./pages/VolunteerPage";
import Unauthorized from "./pages/Unauthorized";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["agency", "admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <Registration />
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/volunteer"
            element={
              <ProtectedRoute allowedRoles={["volunteer", "admin"]}>
                <VolunteerPage />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
