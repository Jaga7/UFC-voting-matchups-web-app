import { Route, Routes } from "react-router-dom";
import { SharedLayout, Home, Logout } from "./pages/dashboard";
import Auth from "./pages/Auth/Auth";

import useColorTheme from "./hooks/useColorTheme";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FightersPage from "./pages/dashboard/Fighters/Fighters";

function App() {
  const theme = useColorTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='fighters/:weightclass' element={<FightersPage />} />

          <Route path='logout' element={<Logout />} />
        </Route>
        <Route path='auth' element={<Auth />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
