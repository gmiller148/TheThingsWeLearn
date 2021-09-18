import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Crimson Text",
  },
  icon: {
    color: "#878787",
    fontSize: "1rem",
  },
  subtitle: {
    fontSize: "2rem",
    color: "#878787",
    fontFamily: "Roboto Mono",
    marginTop: "10px",
  },
  container: {
    textAlign: "center",
    margin: "0 auto",
  },
  title: {
    color: "black",
    fontSize: "72px",
  },
  goDown: {
    fontSize: "3rem",
  },
}));
export default function Content() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="content">
      content
    </div>
  );
}
