import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { AuthState } from "../../types/AuthT";

import { loginUser } from "../../features/auth/authAsyncActions";

import {
  Button,
  ButtonGroup,
  TextField,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import Header from "../../components/Header/Header";

function Login() {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const authState: AuthState = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") && authState.currentUser) navigate("/");
  }, [authState, navigate]);

  // SUBMIT LOGIN

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username: login, password: password }));
  };

  // SHOW PASSWORD

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // LOGIN INPUT

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  // PASSWORD INPUT

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
      maxWidth={"xs"}
    >
      <Header title='Login' subheader={false} />
      <Grid container direction='column'>
        <Paper elevation={10} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid item mb={1}>
              <TextField
                fullWidth
                required
                value={login}
                onChange={onLoginChange}
                variant='filled'
                type='text'
                label='login'
              />
            </Grid>
            <TextField
              required
              fullWidth
              value={password}
              onChange={onPasswordChange}
              variant='filled'
              label='password'
              type={showPassword ? "text" : "password"}
            />
            <Grid item mt={1}>
              <ButtonGroup orientation='vertical' fullWidth>
                <Button onClick={toggleShowPassword} variant='outlined'>
                  {showPassword ? "Hide Password" : "Show Password"}
                </Button>
                <Button type='submit' variant='contained'>
                  LOGIN
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item mt={0.5}></Grid>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}
export default Login;
