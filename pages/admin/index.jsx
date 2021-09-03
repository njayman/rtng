import { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

const Login = () => {
  const [password, setPassword] = useState("");
  const checkPassword = () => {
    if (password === "admin") {
    }
  };
  return (
    <div>
      <Typography variant="h4">Welcome admin</Typography>
      <TextField label="Enter password!" />
      <Button onClick={checkPassword}>Login</Button>
    </div>
  );
};

export default Login;
