import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/Authcontext";

function isUserLoggedin() {
  const { user, isAuthenticated } = useContext(AuthContext);
  console.log(user, "user");
  console.log(isAuthenticated, "isAuthenticated");

  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
}

export function ProtectedRoute({ children }) {
  // const a = isUserLoggedin();
  // console.log(a);
  if (!isUserLoggedin()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export function PublicRoute({ children }) {
  return children;
}

export function SemiProtectedRoute({ children }) {
  if (isUserLoggedin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
