import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
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
  content: {
    color: "#878787",
  },
  readMore: {
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

const BioCard = (props) => {
  const { bio } = props;
  const [viewingArt, setViewingArt] = useState(bio.learned === "");
  const [art, setArt] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    fetch(`/api/image/${bio._id}`)
      .then((image) => {
        return image.status !== 200 ? null : image.json();
      })
      .then((imageObj) => {
        setArt(imageObj);
      });
  });

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
  if (bio.learned !== "" && bio.hasArt) {
    tabs = (
      <>
        {meTab}
        {"  /  "}
        {artTab}
      </>
    );
  } else if (bio.learned !== "" && !bio.hasArt) {
    tabs = meTab;
  } else {
    tabs = artTab;
  }
  const history = useHistory();

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <div
          className={classes.name}
          onClick={() => history.push(`/person/${bio._id}`)}
        >
          {bio.name}
        </div>
        <div className={classes.year}>
          {bio.birthYear}-{bio.deathYear}
        </div>
        <div className={classes.learnGrid}>
          <div className={classes.spans}>{tabs}</div>
          <div className={classes.content}>
            {viewingArt ? (
              art ? (
                <>
                  <img
                    alt="personalImage"
                    className={classes.image}
                    src={`data:${
                      art.imageData.contentType
                    };base64,${art.imageData.data.toString("base64")}`}
                  ></img>
                  <div className={classes.artist}>
                    {" "}
                    - {art.artist || "unknown"}
                  </div>
                </>
              ) : (
                <></>
              )
            ) : (
              <>
                {bio.learned.length < 500 ? (
                  <NewlineText text={bio.learned} />
                ) : (
                  <LongText text={bio.learned} length={500} />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const LongText = (props) => {
  const { text, length } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return open ? (
    <>
      <NewlineText text={text} />
      <div className={classes.readMore} onClick={() => setOpen(false)}>
        collapse
      </div>
    </>
  ) : (
    <>
      <NewlineText text={text.slice(0, length) + "..."} />
      <div className={classes.readMore} onClick={() => setOpen(true)}>
        read more
      </div>
    </>
  );
};

// https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
const NewlineText = (props) => {
  const text = props.text || "";
  const newText = text.split("\n").map((str) => <p>{str}</p>);

  return newText;
};

export default BioCard;
