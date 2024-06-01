import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import stil from "./login.module.css";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let Email = email.current.value;
    let PassWord = password.current.value;

    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!validateEmail(Email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!validatePassword(PassWord)) {
      newErrors.password = "Incorrect password";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    const data = JSON.parse(localStorage.getItem("usersData")) ?? [];

    const user = data.filter(({ email, password }) => {
      return email === Email && password === PassWord;
    });

    if (user.length) {
      localStorage.setItem("user", JSON.stringify(true));
      navigate("/dashboard");
    } else {
      setErrors({ ...newErrors, password: "Incorrect email or password" });
      localStorage.setItem("user", JSON.stringify(false));
    }
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  return (
    <div className={stil.loginWrapper}>
      <div className={stil.container}>
        <div className={stil.box}>
          <div className={stil.boxWrapper}>
            <div className={stil.logo}>
              <p className={stil.loginh1}>Nice to see you!</p>
              <p className={stil.pText}>
                Enter your email and password to sign in
              </p>
            </div>
            <form className={stil.form} onSubmit={handleSubmit}>
              <div className={stil.emailDiv}>
                <p className={stil.formText}>Email</p>
                <input
                  ref={email}
                  className={stil.emailInp}
                  type="email"
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className={stil.errorText}>{errors.email}</p>
                )}
              </div>
              <div className={stil.passwordDiv}>
                <p className={stil.formText}>Password</p>
                <input
                  ref={password}
                  className={stil.passwordInp}
                  type="password"
                  placeholder="your password"
                />
                {errors.password && (
                  <p className={stil.errorText}>{errors.password}</p>
                )}
              </div>
              <Stack
                className={stil.Stack}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography className={stil.lastText}>Remember me</Typography>
              </Stack>
              <button className={stil.submitBtn} type="submit">
                Sign in
              </button>
            </form>
            <Link to={"/signup"} className={stil.a}>
              <p className={stil.deck}>Already have an account?</p> Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
