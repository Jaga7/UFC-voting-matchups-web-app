import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { AuthState } from "../../types/AuthT";

import { loginUser, registerUser } from "../../features/auth/authAsyncActions";

import {
  Button,
  ButtonGroup,
  TextField,
  Grid,
  Paper,
  Container,
  Typography,
  Box,
} from "@mui/material";
import Header from "../../components/Header/Header";

function Auth() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const authState: AuthState = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") && authState.currentUser) navigate("/");
  }, [authState, navigate]);

  // SUBMIT LOGIN or REGISTER

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMember) {
      dispatch(loginUser({ username: username, password: password }));
    } else {
      dispatch(registerUser({ username: username, password: password }));
    }
  };

  // SHOW PASSWORD

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // USERNAME INPUT

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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
      {isMember ? (
        <Header title='Login' subheader={false} />
      ) : (
        <Header title='Register' subheader={false} />
      )}

      <Grid container direction='column'>
        <Paper elevation={10} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid item mb={1}>
              <TextField
                fullWidth
                required
                value={username}
                onChange={onUsernameChange}
                variant='filled'
                type='text'
                label='username'
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
                  {isMember ? "LOGIN" : "REGISTER"}
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item mt={0.5}></Grid>
          </form>
          <Typography textAlign='center'>
            {isMember ? "Not a member yet? " : "Already a member? "}
            <button
              type='button'
              onClick={() => setIsMember(!isMember)}
              className='member-btn'
            >
              {isMember ? "Register" : "Login"}
            </button>
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
}
export default Auth;
