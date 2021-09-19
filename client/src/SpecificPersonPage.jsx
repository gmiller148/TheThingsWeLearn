import React, { useEffect, useState } from "react";
import { formatMs, makeStyles, withStyles } from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ececdd",
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
    background: "#ececdd",
  },
  name: {
    fontFamily: "Crimson Text",
    fontSize: "2rem",
    color: "black",
  },
  year: {
    fontFamily: "Roboto Mono",
    fontSize: "1rem",
    color: "#878787",
  },
  learnGrid: {
    marginTop: "0.5rem",
    fontFamily: "Roboto Mono",
  },
  spans: {
    marginBottom: "0.5rem",
  },
  gridHeader: {
    color: "black",
  },
  learned: {
    fontSize: "1rem",

    color: "#878787",
  },
  active: {
    color: "black",
    textDecoration: "underline",
  },
  inactive: {
    color: "#878787",
    textDecoration: "none",
  },
  option: {
    cursor: "pointer",
  },
  editButton: {
    marginTop: "1rem",
    color: "#878787",
    cursor: "pointer",
    transition: "1s",
    "&:hover": {
      color: "black",
      textDecoration: "underline",
    },
  },
  loading: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    "-ms-transform": "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    fontFamily: "Roboto Mono",
    color: "#878787",
    fontSize: "2rem",
  },
  formPadding: {
    marginTop: "1rem",
    marginRight: "1rem",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    // marginLeft: "auto",
    // marginRight: "auto",
    // display: "block",
  },
  artist: {
    fontFamily: "Roboto Mono",
    color: "#878787",
    marginTop: "1rem",
  },
}));

const SpecificPersonPage = (props) => {
  const classes = useStyles();
  const [myInfo, setMyInfo] = useState("");
  const [art, setArt] = useState(null);
  const [viewingArt, setViewingArt] = useState(
    !(myInfo && myInfo.learned !== "")
  );
  const [loading, setLoading] = useState(true);
  const personId = props.match.params.personId;
  useEffect(() => {
    fetch(`/api/person/${personId}`)
      .then((res) => res.json())
      .then((response) => {
        setMyInfo(response);
        setViewingArt(!(response && response.learned !== ""));
        return fetch(`/api/image/${personId}`);
      })
      .then((image) => {
        return image.status !== 200 ? null : image.json();
      })
      .then((imageObj) => {
        setArt(imageObj);
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setLoading(false);
      });
  }, [personId]);

  const artTab = (
    <span
      onClick={() => setViewingArt(true)}
      className={`${viewingArt ? classes.active : classes.inactive} ${
        classes.option
      }`}
    >
      art that speaks to me
    </span>
  );
  const meTab = (
    <span
      onClick={() => setViewingArt(false)}
      className={`${!viewingArt ? classes.active : classes.inactive} ${
        classes.option
      }`}
    >
      what i've learned
    </span>
  );
  let tabs;
  if (myInfo.learned !== "" && myInfo.hasArt) {
    tabs = (
      <>
        {meTab}
        {"  /  "}
        {artTab}
      </>
    );
  } else if (myInfo.learned !== "" && !myInfo.hasArt) {
    tabs = meTab;
  } else {
    tabs = artTab;
  }

  return (
    <div className={classes.root}>
      <Navbar />
      {loading ? (
        <div className={classes.loading}>loading page...</div>
      ) : (
        <main className={classes.main}>
          <div className={classes.name}>{myInfo.name}</div>
          <div className={classes.year}>
            {myInfo.birthYear}-{myInfo.deathYear}
          </div>
          <div className={classes.learnGrid}>
            <div className={classes.spans}>{tabs}</div>
            <div className={classes.content}>
              {viewingArt ? (
                <Art art={art} />
              ) : (
                <MyLearning learned={myInfo.learned} />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

const Art = (props) => {
  const classes = useStyles();
  const { me, art } = props;
  return (
    <div>
      {art ? (
        <>
          <img
            alt="personalImage"
            className={classes.image}
            src={`data:${
              art.imageData.contentType
            };base64,${art.imageData.data.toString("base64")}`}
          ></img>
          <div className={classes.artist}> - {art.artist || "unknown"}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const MyLearning = (props) => {
  const { learned } = props;

  const classes = useStyles();
  return (
    <div className={classes.learned}>
      <NewlineText text={learned} />
    </div>
  );
};

// https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
const NewlineText = (props) => {
  const text = props.text || "";
  const newText = text.split("\n").map((str) => <p>{str}</p>);

  return newText;
};

export default SpecificPersonPage;
