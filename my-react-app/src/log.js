import { useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { nameset } from "./store";
import "./css.css";

const App = () => {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [result, setResult] = React.useState("enter the details");
  const fun = useDispatch();
  const nav = useNavigate();

  const toCheck = async () => {
    const res = await axios.post("http://localhost:5000/tocheck/user", {
      name: username,
      pass: password,
    });
    if (res.data === "ok") {
      fun(nameset(username));

      nav("/chart");
    }
    setResult(res.data);
  };

  return (
    <div className="login_cont">
      <div className="login">
        <p>Name</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={toCheck}>Login</button>
        <p>{result}</p>
        <button onClick={() => nav("/sign")}>Sign Up</button>
      </div>
    </div>
  );
};

export default App;
