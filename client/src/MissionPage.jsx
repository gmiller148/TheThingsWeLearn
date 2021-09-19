import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ECECDD",
    overflowY: "scroll",
  },
  main: {
    marginTop: "2rem",
    marginBottom: "2rem",
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    width: "60%",
    border: "1px solid black",
    borderRadius: "30px",
    padding: "2rem",
    paddingTop: "1rem",
  },
  name: {
    fontFamily: "Crimson Text",
    fontSize: "2rem",
    color: "black",
  },
  text: {
    fontFamily: "Roboto Mono",
    fontSize: "1rem",
    color: "#878787",
  },
}));

const MissionPage = () => {
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
      <Navbar />
      <main className={classes.main}>
        <div className={classes.name}>Our Mission</div>
        <div className={classes.text}>
          The mission of this website is to build a home for lived experiences.
          The goal is to capture a glimpse of the wisdom and meaning that imbued
          an individual’s life on earth. We live in unprecedented times. There
          are more people alive now than ever before; more ideas, more emotions,
          more stories, and more relationships. The question of the meaning of
          life can feel static and impersonal, while our lives are inherently
          dynamic and personal. We live, love and learn. The advent of the
          internet brings with it the opportunity to document this vast network
          of human learning, across culture and continent. We want to create a
          platform which gives all people the ability to pass on some of the
          wisdom they’ve gained in this lifetime. We believe this fountain of
          human learning can serve as a guiding light in these trying times.
          Fundamentally, the human condition project is an art piece which seeks
          to include as many artists as possible in expressing “what did you
          learn in this life.”
        </div>
      </main>
    </div>
  );
};

export default MissionPage;
