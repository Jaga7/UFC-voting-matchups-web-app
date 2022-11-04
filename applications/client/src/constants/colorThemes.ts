import {
  blue,
  deepPurple,
  green,
  indigo,
  red,
  yellow,
} from '@mui/material/colors';

//  DARK MODE

export const darkMode = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: 'hsla(270, 35%, 35%, 0.6)',
            border: '2px solid hsl(270, 35%, 15%)',
          },
        },
      },
    },
  },
  // typography: {

  // },
  palette: {
    primary: {
      main: 'hsl(270, 44%, 45%)',
    },
    background: {
      default: 'hsl(270, 16%, 8%)',
      paper: 'hsl(270, 18%, 13%)',
      light: 'hsl(270, 36%, 24%)',
    },
    secondary: {
      main: indigo[200],
    },
    error: {
      main: red[300],
    },
    success: {
      main: green[500],
    },
    warning: {
      main: yellow[200],
    },
    info: {
      main: blue[800],
    },
    action: {
      disabled: 'hsla(0, 0%, 35%, 0.9)',
    },
    text: {
      primary: 'hsla(245, 33%, 98%, 0.95)',
      secondary: 'hsla(245, 33%, 98%, 0.8)',
      disabled: 'hsla(245, 33%, 98%, 0.6)',
      light: 'hsla(245, 33%, 98%, 0.95)',
    },
    neutral: {
      main: 'hsla(230, 20%, 20%, 0.9)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
};

//  LIGHT MODE

export const lightMode = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: 'hsla(225, 45%, 40%, 0.6)',
            border: '2px solid hsl(225, 45%, 90%)',
          },
        },
      },
    },
  },
  // typography: {

  // },
  palette: {
    primary: {
      main: deepPurple[400],
    },
    background: {
      default: '#fff',
      paper: '#F8F8F8',
      light: 'hsl(215, 33%, 50%)',
    },
    secondary: {
      main: blue[800],
    },
    error: {
      main: red[600],
    },
    success: {
      main: green[500],
    },
    warning: {
      main: yellow[600],
    },
    info: {
      main: blue[600],
    },
    neutral: {
      main: 'hsla(0, 0%, 85%, 0.9)',
    },
    action: {
      disabled: 'hsla(0, 0%, 50%, 0.9)',
    },
    text: {
      primary: '#000000',
      light: '#FFFFFF',
      secondary: 'rgba(0, 0, 0, 0.85)',
      disabled: 'rgba(0, 0, 0, 0.5)',
    },
  },
};

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface TypeBackground {
    light: string;
  }

  interface TypeText {
    light: string;
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
