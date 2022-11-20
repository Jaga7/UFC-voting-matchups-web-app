import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authState = useAppSelector((state) => state.authReducer);
  if (!authState.currentUser) {
    return <Navigate to='/auth' />;
  }
  return children;
};

export default ProtectedRoute;
