import { useMemo, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { setTheme } from '../features/colorTheme/colorThemeSlice';
import { lightMode, darkMode } from '../constants/colorThemes';

function useColorTheme() {
  const colorThemeState = useAppSelector(
    (state) => state.colorThemeReducer.mode
  );

  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const dispatch = useAppDispatch();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const themeInStorage = localStorage.getItem('theme');

    if (currentUser?.options?.colorTheme) {
      dispatch(setTheme(currentUser?.options?.colorTheme));
      localStorage.setItem('theme', currentUser?.options?.colorTheme);
    } else {
      if (themeInStorage) {
        dispatch(setTheme(themeInStorage));
      } else {
        prefersDarkMode
          ? dispatch(setTheme('dark'))
          : dispatch(setTheme('light'));
      }
    }
  }, [dispatch, prefersDarkMode, currentUser]);

  const theme = useMemo(
    () => createTheme(colorThemeState === 'dark' ? darkMode : lightMode),
    [colorThemeState]
  );
  return theme;
}
export default useColorTheme;
