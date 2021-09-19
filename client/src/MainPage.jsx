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
  const [bios, setBios] = useState([]);
  useEffect(() => {
    fetch(`/api/bios`)
      .then((res) => res.json())
      .then((response) => {
        console.log({ response });
        setBios(response.bios);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Content bios={bios} />
    </div>
  );
};

export default MainPage;
