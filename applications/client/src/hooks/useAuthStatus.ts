import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";

function useAuthStatus() {
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.authReducer);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [navigate, authState.currentUser, token]);

  return authState.currentUser;
}
export default useAuthStatus;
