import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "0px",
    right: "0px",
    // width: "300px",
    paddingLeft: "4rem",
    height: "100%",
    borderLeft: "2px solid black",
    fontFamily: "Roboto mono",
    paddingTop: "0.4rem",
    display: "block",
    background: "#ECECDD",
  },
  icon: {
    fontSize: "2rem",
    float: "right",
    display: "block",
    color: "#878787",
    marginTop: "7px",
    cursor: "pointer",
    paddingRight: "0.7rem",
    // paddingBottom: "0.7rem",
  },
  menu: {
    fontSize: "1rem",
    float: "right",
    paddingRight: "1rem",
    textAlign: "right",
  },
  menuHeader: {
    color: "black",
    paddingTop: "0.3rem",
    cursor: "pointer",
    transition: "1s",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  menuItem: {
    color: "#878787",
    paddingTop: "0.3rem",
    cursor: "pointer",
    transition: "1s",
    "&:hover": {
      textDecoration: "underline",
      color: "black",
    },
  },
}));

const categories = ["Paintings", "Poetry", "Essays", "Music", "Photography"];
const centuries = [
  "16th Century",
  "17th Century",
  "18th Century",
  "19th Century",
  "20th Century",
  "21th Century",
];

const Sidebar = (props) => {
  const classes = useStyles();
  const { setSidebarOpen } = props;
  const history = useHistory();
  const handleItemClick = (location) => {
    history.push(`/${location}`);
  };
  return (
    <div className={classes.root}>
      <CloseIcon
        className={classes.icon}
        onClick={() => setSidebarOpen(false)}
      />
      <br />
      <div className={classes.menu}>
        <div className={classes.menuHeader}>Gallery</div>
        {categories.map((category) => {
          return (
            <div
              className={classes.menuItem}
              key={category}
              onClick={() => handleItemClick(category)}
            >
              {category}
            </div>
          );
        })}
        <div className={classes.menuHeader}>Time</div>
        {centuries.map((century) => {
          return (
            <div
              className={classes.menuItem}
              key={century}
              onClick={() => handleItemClick(century)}
            >
              {century}
            </div>
          );
        })}
        <div
          className={classes.menuHeader}
          key={"mission"}
          onClick={() => handleItemClick("mission")}
        >
          Mission
        </div>
        <div
          className={classes.menuHeader}
          key={"login"}
          onClick={() => handleItemClick("login")}
        >
          You
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
