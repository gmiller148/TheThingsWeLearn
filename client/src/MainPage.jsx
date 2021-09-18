import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Content from "./Content";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ECECDD",
    overflowY: "scroll",
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
  return (
    <div className={classes.root}>
      <Header />
      <Content />
    </div>
  );
};

export default MainPage;
