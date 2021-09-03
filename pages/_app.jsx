import "../styles/globals.css";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Link from "next/link";
import MLink from "@material-ui/core/Link";
import { createTheme } from "@material-ui/core/styles";
import brown from "@material-ui/core/colors/brown";

const theme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    margin: "10px auto",
  },
  content: {
    height: "100%",
    display: " flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "space-evenly",
  },
  footer: {
    padding: "5px",
  },
  link: {
    color: "blue",
  },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Typography variant="h6" className={classes.title}>
            Rajia Treat and Groceries
          </Typography>
        </AppBar>
        <Container fixed className={classes.content}>
          <Component {...pageProps} />
        </Container>
        <Typography variant="subtitle2" className={classes.footer}>
          Rajia Treat and Groceries ©2018 Created by{" "}
          <MLink
            color="textPrimary"
            component={Link}
            href="https://github.com/njayman"
          >
            <a target="_blank" className={classes.link}>
              Njayman
            </a>
          </MLink>
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
