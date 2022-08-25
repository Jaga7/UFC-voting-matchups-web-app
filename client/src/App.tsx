import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import useColorTheme from "./hooks/useColorTheme";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const theme = useColorTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
