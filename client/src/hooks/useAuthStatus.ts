import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { loginUserByToken } from "../features/auth/authAsyncActions";

function useAuthStatus() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReducer);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (token && !authState.isLoading) {
        if (!authState.currentUser) {
          dispatch(loginUserByToken(+token));
        }
      }
    }
  }, [navigate, authState.currentUser, dispatch, token]);

  return authState.currentUser;
}
export default useAuthStatus;
