import React, { useEffect, useState } from "react";
import { formatMs, makeStyles, withStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import { TextField } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import axios from "axios";

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

const PersonalPage = () => {
  const classes = useStyles();
  const [myInfo, setMyInfo] = useState("");
  const [artEditing, setArtEditing] = useState(false);
  const [myStatement, setMyStatement] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/myinfo")
      .then((res) => res.json())
      .then((response) => {
        setMyInfo(response);
        return fetch(`/api/image/${response._id}`);
      })
      .then((image) => {
        return image.status !== 200 ? null : image.json();
      })
      .then((imageObj) => {
        console.log({ imageObj });
        setImageData(imageObj);
        setArtEditing(imageObj === null);
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Navbar />
      {loading ? (
        <div className={classes.loading}>loading your page...</div>
      ) : (
        <main className={classes.main}>
          <div className={classes.name}>{myInfo.name}</div>
          <div className={classes.year}>{myInfo.birthYear}-</div>
          <div className={classes.learnGrid}>
            <div className={classes.spans}>
              <span
                onClick={() => setMyStatement(true)}
                className={`${
                  myStatement ? classes.active : classes.inactive
                } ${classes.option}`}
              >
                what i've learned
              </span>
              <span className={classes.inactive}>{"  /  "}</span>
              <span
                onClick={() => setMyStatement(false)}
                className={`${
                  !myStatement ? classes.active : classes.inactive
                } ${classes.option}`}
              >
                art that speaks to me
              </span>
            </div>

            {myStatement ? (
              <MyLearning learned={myInfo.learned} />
            ) : (
              <Art
                me={myInfo}
                imageData={imageData}
                editing={artEditing}
                setEditing={setArtEditing}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
};

const Art = (props) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [artist, setArtist] = useState("");
  const { me, imageData, editing, setEditing } = props;

  const submitPhoto = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("artist", artist);
    axios.post("/api/image", formData).then((res) => {
      setEditing(false);
    });
  };
  return editing ? (
    <form>
      <Button
        variant="outlined"
        className={classes.formPadding}
        style={{ fontFamily: "Roboto mono", textTransform: "none" }}
        component="label"
      >
        {selectedFile ? selectedFile.name.toLowerCase() : "upload image"}
        <input
          type="file"
          accept="image/png"
          hidden
          onChange={({ target }) => {
            setSelectedFile(target.files[0]);
          }}
        />
      </Button>
      <br />
      <CssTextField
        placeholder="artist"
        className={classes.formPadding}
        InputLabelProps={{
          style: {
            fontFamily: "Roboto Mono",
          },
        }}
        FormHelperTextProps={{
          style: {
            fontFamily: "Roboto Mono",
          },
        }}
        InputProps={{
          style: {
            fontFamily: "Roboto Mono",
          },
        }}
        value={artist}
        onChange={(e) => {
          setArtist(e.target.value);
        }}
      />
      <br />
      <Button
        variant="outlined"
        className={classes.formPadding}
        style={{ fontFamily: "Roboto mono", textTransform: "none" }}
        onClick={() => submitPhoto()}
      >
        save
      </Button>
      <Button
        variant="outlined"
        className={classes.formPadding}
        style={{ fontFamily: "Roboto mono", textTransform: "none" }}
        onClick={() => setEditing(false)}
      >
        cancel
      </Button>
    </form>
  ) : (
    <div>
      {imageData ? (
        <>
          <img
            alt="personalImage"
            className={classes.image}
            src={`data:${
              imageData.imageData.contentType
            };base64,${imageData.imageData.data.toString("base64")}`}
          ></img>
          <div className={classes.artist}>
            {" "}
            - {imageData.artist || "unknown"}
          </div>
          <div className={classes.editButton} onClick={() => setEditing(true)}>
            edit
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const MyLearning = (props) => {
  const { learned } = props;
  const [editingMyStatement, setEditingMyStatement] = useState(false);
  const [myStatement, setMyStatement] = useState(learned);

  const setEditing = () => {
    setEditingMyStatement(!editingMyStatement);
    if (editingMyStatement) {
      fetch("/api/statement", {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
          statement: myStatement,
        }),
      });
    }
  };

  const classes = useStyles();
  return (
    <>
      {!editingMyStatement ? (
        <div className={classes.learned}>
          <NewlineText text={myStatement} />
        </div>
      ) : (
        <div className={classes.learned}>
          <CssTextField
            placeholder="what have you learned"
            InputLabelProps={{
              style: {
                fontFamily: "Roboto Mono",
              },
            }}
            FormHelperTextProps={{
              style: {
                fontFamily: "Roboto Mono",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "Roboto Mono",
              },
            }}
            value={myStatement}
            fullWidth
            multiline
            onChange={(e) => {
              setMyStatement(e.target.value);
            }}
          />
        </div>
      )}

      <div className={classes.editButton} onClick={() => setEditing()}>
        {!editingMyStatement ? "edit" : "save"}
      </div>
    </>
  );
};

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#878787",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#878787",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#878787",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#878787",
      },
    },
  },
})(TextField);

// https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
const NewlineText = (props) => {
  const text = props.text || "";
  const newText = text.split("\n").map((str) => <p>{str}</p>);

  return newText;
};

export default PersonalPage;
