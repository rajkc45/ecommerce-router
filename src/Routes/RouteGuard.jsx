import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Loading from "../Pages/Loading";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  return children;
}

export function SemiProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}