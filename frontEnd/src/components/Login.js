import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  
  const Oauth = () =>{
    console.log("first")
  }

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8080/userauth/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log("🚀 ~ file: Login.js:29 ~ sendRequest ~ data:", data)
    console.log(data.message);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => history("/user"));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',

      }}>
      <Box sx={{
        border: '1px solid black',
        borderRadius: '10px',
        padding: 4
      }}>
        <form onSubmit={handleSubmit}>
          <Box
            marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2">Login</Typography>

            <TextField
              name="email"
              onChange={handleChange}
              type={"email"}
              value={inputs.email}
              variant="outlined"
              placeholder="Email"
              margin="normal"
            />
            <TextField
              name="password"
              onChange={handleChange}
              type="password"
              value={inputs.password}
              variant="outlined"
              placeholder="Password"
              margin="normal"
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Typography variant="body1" sx={{
              padding: 1
            }}>
              OR
            </Typography>
           
            <Button sx={{
              backgroundColor: '#fff',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              color:"blue",
              cursor: 'pointer'
            }}
            href="http://localhost:8080/auth/google'"
            >
              Login with Google
            </Button>

          </Box>
        </form>
      </Box>

    </Box>
  );
};

export default Login;
