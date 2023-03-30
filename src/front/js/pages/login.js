import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };

    fetch("https://3001-4geeksacade-reactflaskh-okcpm85ba5u.ws-us88.gitpod.io/api/token", opts)
      .then(resp => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error!");
      })
      .then(data => {
        console.log("this came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
        actions.setLoggedIn(true);
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div>
        <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};



