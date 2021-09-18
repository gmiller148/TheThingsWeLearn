import React, { useState, useEffect } from "react";
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
  header: {
    marginBottom: "1rem",
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

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateYear = (year) => {
  return (
    year.length > 0 &&
    !year.includes(".") &&
    !Number.isNaN(parseInt(year)) &&
    parseInt(year) >= 0 &&
    parseInt(year) <= 2021
  );
};

const RegisterPage = (props) => {
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
  const history = useHistory();
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");

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
    if (fullName === "") {
      setFullNameError("name required");
      allGood = false;
    }
    if (!validateYear(year)) {
      setYearError("valid year required");
      allGood = false;
    }

    if (allGood) {
      setEmailError("");
      setYearError("");
      setFullNameError("");
      setPasswordError("");
    }
    return allGood;
  };
  const attemptRegister = async (e) => {
    e.preventDefault();

    if (validate()) {
      const res = await fetch("/api/register", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: fullName,
          birthYear: year,
          email: email,
          password: password,
        }),
      });
      if (res.status === 409) {
        setEmailError("email already in use");
        setEmail("");
      } else if (res.status === 200) {
        history.push("/me");
      } else {
        setFullNameError("an error has occurred");
        setEmail("");
        setPassword("");
        setYear("");
        setFullName("");
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <div className={classes.header}>register</div>
        <CssTextField
          label="full name"
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
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (e.target.value === "") {
              setFullNameError("name required");
            } else {
              setFullNameError("");
            }
          }}
          {...(fullNameError && { error: true, helperText: fullNameError })}
        />
        <br />
        <CssTextField
          label="birth year"
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
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            if (!validateYear(e.target.value)) {
              setYearError("valid year required");
            } else {
              setYearError("");
            }
          }}
          {...(yearError && { error: true, helperText: yearError })}
        />
        <br />
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
          onChange={(e) => {
            setEmail(e.target.value);
            if (!validateEmail(e.target.value)) {
              setEmailError("valid email required");
            } else {
              setEmailError("");
            }
          }}
          {...(emailError && { error: true, helperText: emailError })}
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
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value === "") {
              setPasswordError("password required");
            } else {
              setPasswordError("");
            }
          }}
          {...(passwordError && { error: true, helperText: passwordError })}
        />
        <br />
        <Button
          variant="outlined"
          className={classes.button}
          style={{ fontFamily: "Roboto mono", textTransform: "none" }}
          onClick={attemptRegister}
        >
          join
        </Button>
        <div className={classes.goToReg}>
          have an account?{" "}
          <span
            className={classes.regLink}
            onClick={() => history.push("/login")}
          >
            login
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

export default RegisterPage;
