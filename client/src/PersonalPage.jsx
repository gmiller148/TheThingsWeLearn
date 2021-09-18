import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import { TextField } from "@material-ui/core";

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
}));

const PersonalPage = () => {
  const classes = useStyles();
  const [myInfo, setMyInfo] = useState("");
  const [myStatement, setMyStatement] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/myinfo")
      .then((res) => res.json())
      .then((response) => {
        console.log({ response });
        setMyInfo(response);
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
              <div>bullshit</div>
            )}
          </div>
        </main>
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
