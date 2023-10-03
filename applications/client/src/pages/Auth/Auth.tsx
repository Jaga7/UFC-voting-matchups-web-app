import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { AuthState } from "../../types/AuthT";

import { loginUser, registerUser } from "../../features/auth/authAsyncActions";

import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import Header from "../../components/Header/Header";
import * as yup from "yup";
import { Formik } from "formik";
import { FormInput } from "../../shared/components/form-input";

function Auth() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required("Username is required")
      .min(3, "Username should have at least 3 letters"),

    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(4, "Password should have at least 4 letters"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const authState: AuthState = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") && authState.currentUser) navigate("/");
  }, [authState, navigate]);

  // SUBMIT LOGIN or REGISTER

  const handleSubmit = (values: any, setSubmitting: any) => {
    if (isMember) {
      dispatch(loginUser({ ...values }));
    } else {
      dispatch(registerUser({ ...values }));
    }
  };

  // SHOW PASSWORD

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {(props: any) => {
              const {
                values,
                handleChange,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                isValid,
                dirty,
                isSubmitting,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Grid item mb={1}>
                    <FormInput
                      label={"Username"}
                      value={values}
                      name={"username"}
                      type={"text"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      error={errors}
                    ></FormInput>
                  </Grid>
                  <FormInput
                    label={"Password"}
                    value={values}
                    name={"password"}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    error={errors}
                  ></FormInput>
                  <Grid item mt={1}>
                    <ButtonGroup orientation='vertical' fullWidth>
                      <Button onClick={toggleShowPassword} variant='outlined'>
                        {showPassword ? "Hide Password" : "Show Password"}
                      </Button>

                      <Button
                        type='submit'
                        variant='contained'
                        disabled={!isValid || !dirty || isSubmitting}
                      >
                        {isMember ? "LOGIN" : "REGISTER"}
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item mt={0.5}></Grid>
                </form>
              );
            }}
          </Formik>

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
