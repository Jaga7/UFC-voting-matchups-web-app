import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { logoutUser } from "../../../features/auth/authSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(logoutUser());
      navigate("/auth");
    } else {
      navigate("/auth");
    }
  }, [navigate, dispatch]);
  return <div>Logout</div>;
};

export default Logout;
