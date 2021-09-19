import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import BioCard from "./BioCard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));
export default function Content(props) {
  const { bios } = props;
  const classes = useStyles();
  // const checked = useWindowPosition("header");
  // const [checked, setChecked] = useState(false);
  // useEffect(() => {
  //   setChecked(true);
  // }, []);
  console.log({ bios });
  return (
    <div className={classes.root} id="content">
      <Navbar />
      {bios.map((bio) => (
        <BioCard bio={bio} key={bio.name} />
      ))}
    </div>
  );
}
