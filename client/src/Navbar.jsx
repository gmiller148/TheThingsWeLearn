import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: "0px",
    right: "0px",
    left: "0px",
    height: "50px",
    fontFamily: "Crimson Text",
    paddingTop: "0.5rem",
    background: "#ECECDD",
  },
  left: {
    float: "left",
    fontSize: "2rem",
    paddingLeft: "0.5rem",
  },
  right: {
    float: "right",
    paddingRight: "0.5rem",
  },
  icon: {
    fontSize: "2rem",
    color: "#878787",
    marginTop: "7px",
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.left}>The Things We Learn</div>
      <div className={classes.right}>
        {!sidebarOpen && (
          <MenuIcon
            className={classes.icon}
            onClick={() => setSidebarOpen(true)}
          />
        )}
        {sidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen} />}
      </div>
    </div>
  );
};
export default Navbar;
