import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import PersonalPage from "./PersonalPage";

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

const categories = ["paintings", "poetry", "essays", "music", "photography"];
const centuries = [
  "16th century",
  "17th century",
  "18th century",
  "19th century",
  "20th century",
  "21th century",
];

const Sidebar = (props) => {
  const classes = useStyles();
  const { setSidebarOpen } = props;
  const history = useHistory();
  const handleItemClick = (location) => {
    history.push(`/${location}`);
  };
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    fetch("/api/loggedIn")
      .then((res) => {
        setLoggedIn(res.status === 200);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const handleLogout = () => {
    fetch("/api/logout")
      .then((res) => {
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <CloseIcon
        className={classes.icon}
        onClick={() => setSidebarOpen(false)}
      />
      <br />
      <div className={classes.menu}>
        <div
          className={classes.menuHeader}
          onClick={() => handleItemClick("gallery")}
        >
          Gallery
        </div>
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
          mission
        </div>
        <div
          className={classes.menuHeader}
          key={"login"}
          onClick={() => handleItemClick("login")}
        >
          you
        </div>
        {loggedIn && (
          <div
            className={classes.menuHeader}
            key={"logout"}
            onClick={() => handleLogout()}
          >
            logout
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
