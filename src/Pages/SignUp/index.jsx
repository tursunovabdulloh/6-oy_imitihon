import React, { useState } from "react";
import style from "./style.module.css";
import { Link, json, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
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

function SignUp() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    title: "",
    avatar: "",
    email: "",
    password: "",
  });

  function validateInput() {
    const xato = {};
    const emailxato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlxatosi = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!userInput.name.trim()) {
      xato.name = "Ism kerak";
    }
    if (!urlxatosi.test(userInput.avatar)) {
      xato.avatar = "Avatar URL formati noto'g'ri";
    }
    if (!emailxato.test(userInput.email)) {
      xato.email = "Email formati noto'g'ri";
    }
    if (userInput.password.length < 6) {
      xato.password = "incorrect password";
    }
    return xato;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInput);
    try {
      const validationErrors = validateInput();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      } else {
        const req = await fetch("https://api.escuelajs.co/api/v1/users/", {
          method: "POST",
          headers: {
            Access: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userInput }),
        });
        const res = await req.json();
        console.log(res);

        localStorage.setItem("usersData", JSON.stringify([res]));

        setUserInput({
          title: "",
          avatar: "",
          email: "",
          password: "",
        });
        setErrors({});
        navigate("/");
      }
    } catch {
      alert("error");
    }
  };
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.title}>
          <h2 className={style.h2}>Welcome!</h2>
          <p className={style.subtext}>
            Use these awesome forms to login or create new account in your
            project for free.
          </p>
        </div>
        <div className={style.box}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.passwordDiv}>
              <p className={style.password}>Name</p>
              <input
                value={userInput.name}
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, name: e.target.value }))
                }
                className={style.passwordInp}
                type="text"
                placeholder="Your full name"
              />
              {errors.name && <p className={style.error}>{errors.name}</p>}
            </div>
            <div className={style.passwordDiv}>
              <p className={style.password}>Avatar</p>
              <input
                value={userInput.avatar}
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, avatar: e.target.value }))
                }
                className={style.passwordInp}
                type="url"
                placeholder="Your avatar link"
              />
              {errors.avatar && <p className={style.error}>{errors.avatar}</p>}
            </div>
            <div className={style.passwordDiv}>
              <p className={style.password}>Email</p>
              <input
                value={userInput.email}
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, email: e.target.value }))
                }
                className={style.passwordInp}
                type="email"
                placeholder="Your email address"
              />
              {errors.email && <p className={style.error}>{errors.email}</p>}
            </div>
            <div className={style.passwordDiv}>
              <p className={style.password}>Password</p>
              <input
                value={userInput.password}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={style.passwordInp}
                type="password"
                placeholder="Your password"
              />
              {errors.password && (
                <p className={style.error}>{errors.password}</p>
              )}
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch
                defaultChecked
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography className={style.lastText}>Remember me</Typography>
            </Stack>
            <button className={style.submitBtn} type="submit">
              Sign up
            </button>
          </form>
          <Link to={"/"} className={style.a}>
            <p className={style.deck}>Already have an account?</p> Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
