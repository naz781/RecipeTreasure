import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";

// Auth Context
import { UserAuth } from "./pages/context/AuthContext";

function App() {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/'); // Navigate to home after logout
  };

  // ✅ Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!session) {
      alert("You must be logged in to access this page.");
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      <nav>
        <h1>Family Recipe Treasures</h1>
        <Link to="/">Home</Link>
        {session ? (
          <>
            <Link to="/create">Add Your Favorite Recipe</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ Protect Create & Update Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* Optional: catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
