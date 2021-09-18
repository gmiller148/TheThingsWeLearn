import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ECECDD",
  },
}));

const MainPage = () => {
  const [text, setText] = useState("blank");
  useEffect(() => {
    fetch(`/test`)
      .then((res) => res.json())
      .then((response) => {
        const { hello } = response;
        setText(hello);
      })
      .catch((err) => {});
  }, []);
  const classes = useStyles();
  return <div className={classes.root}>{text}</div>;
};

export default MainPage;
