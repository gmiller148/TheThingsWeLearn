import React, { useEffect, useState } from "react";
import { makeStyles, TextField, withStyles, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Crimson Text",
    background: "#ECECDD",
  },
  form: {
    fontFamily: "Roboto mono",
  },
  button: {
    marginTop: "1rem",
  },
  goToReg: {
    marginTop: "1rem",
    color: "#878787",
  },
  regLink: {
    transition: "1s",
    "&:hover": {
      color: "black",
    },
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

// form code inspired from https://www.youtube.com/watch?v=-XKaSCU0ZLM

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const LoginPage = (props) => {
  // if (props && props.hasOwnProperty('auth')) {
  // pass the person along
  // }
  useEffect(() => {
    fetch("/api/loggedIn").then((res) => {
      if (res.status === 200) {
        window.location.href = "/me";
      }
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const validate = () => {
    let allGood = true;
    if (!validateEmail(email)) {
      setEmailError("valid email required");
      allGood = false;
    }
    if (password === "") {
      setPasswordError("password required");
      allGood = false;
    }
    if (allGood) {
      setEmailError("");
      setPasswordError("");
    }
    return allGood;
  };

  const attemptLogin = async (e) => {
    e.preventDefault();

    if (validate()) {
      const res = await fetch("/api/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (res.status === 401) {
        setEmailError("email or password incorrect");
        setEmail("");
        setPassword("");
      } else if (res.status === 200) {
        window.location.href = "/me";
      } else {
        setEmailError("an error has occurred");
        setEmail("");
        setPassword("");
      }
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <div className={classes.header}>login</div>
        <CssTextField
          label="email"
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
          value={email}
          {...(emailError && { error: true, helperText: emailError })}
          onChange={(e) => {
            setEmail(e.target.value);
            if (!validateEmail(e.target.value)) {
              setEmailError("valid email required");
            } else {
              setEmailError("");
            }
          }}
          autoComplete
        />
        <br />
        <CssTextField
          label="password"
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
          type="password"
          value={password}
          {...(passwordError && { error: true, helperText: passwordError })}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value === "") {
              setPasswordError("password required");
            } else {
              setPasswordError("");
            }
          }}
          autoComplete
        />
        <br />
        <Button
          variant="outlined"
          className={classes.button}
          style={{ fontFamily: "Roboto mono", textTransform: "none" }}
          onClick={attemptLogin}
        >
          login
        </Button>
        <div className={classes.goToReg}>
          new?{" "}
          <span
            className={classes.regLink}
            onClick={() => history.push("/register")}
          >
            register
          </span>
        </div>
      </div>
    </div>
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

export default LoginPage;
