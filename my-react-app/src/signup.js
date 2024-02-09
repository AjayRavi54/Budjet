import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nameset } from "./store";
import "./css.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [res, setRes] = useState("enter all the details");
  const nav = useNavigate();
  const fun = useDispatch();
  const set = async () => {
    const res = await axios.post("http://localhost:5000/set", {
      name: username,
      pass: password,
      email: mail,
    });
    if (res.data === "ok") {
      fun(nameset(username));
      nav("/chart");
    }

    setRes(res.data);
  };
  return (
    <>
    <div className="login_cont"> 
    <div className="login">
      <p>username</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>pass_word</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />
      <p>mail-id</p>
      <input
        type="email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <button onClick={set}>create</button>
      <p>{res}</p></div>
      </div>
    </>
  );
};
export default App;
