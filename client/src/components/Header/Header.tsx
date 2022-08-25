import { Typography } from "@mui/material";

function Header({ title, subheader }: { title: string; subheader: boolean }) {
  return (
    <header>
      <Typography
        component={subheader ? "h2" : "h1"}
        fontSize={subheader ? "1.5em" : "2em"}
        fontWeight='900'
        marginBottom='1.5rem'
      >
        {title}
      </Typography>
    </header>
  );
}
export default Header;
