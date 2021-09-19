import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ECECDD",
    overflowY: "scroll",
  },
}));

const GalleryPage = (props) => {
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
      <Content bios={bios} />
    </div>
  );
};

export default GalleryPage;
