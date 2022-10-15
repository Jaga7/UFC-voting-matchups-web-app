import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setTheme } from "../../features/colorTheme/colorThemeSlice";
import { Switch } from "@mui/material";

// import { usePatchUserMutation } from "../../services/users-service";

function ColorThemeToggle() {
  // const [patchUser] = usePatchUserMutation();
  const dispatch = useAppDispatch();
  const colorThemeState = useAppSelector(
    (state) => state.colorThemeReducer.mode
  );
  // const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const onSwitchChange = () => {
    if (colorThemeState === "light") {
      localStorage.setItem("theme", "dark");
      dispatch(setTheme("dark"));
    } else {
      localStorage.setItem("theme", "light");
      dispatch(setTheme("light"));
    }
    // if (currentUser) {
    //   patchUser({
    //     id: currentUser.id,
    //     options: { colorTheme: colorThemeState === "dark" ? "light" : "dark" },
    //   });
    // }
  };

  return (
    <Switch
      onChange={onSwitchChange}
      color='secondary'
      checked={colorThemeState === "dark"}
    />
  );
}
export default ColorThemeToggle;
