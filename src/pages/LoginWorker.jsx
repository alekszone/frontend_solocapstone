import React from "react";
import { useState, useEffect } from "react";

import Buttons from "../components/LoginWorker/Buttons";
import MyLogin from "../components/LoginWorker/MyLogin";
import MyRegister from "../components/LoginWorker/MyRegister";

export default function LoginWorker(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hideButtons, setHideButtons] = useState(true);

  const sendTo = () => {
    setShowLogin(!showLogin);

    setHideButtons(!hideButtons);
  };
  const back = () => {
    setShowLogin(!showLogin);

    setHideButtons(!hideButtons);
  };
  const Register = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };
  const back1 = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  const Login = () => {
    setShowRegister(!showRegister);
    setShowLogin(!showLogin);
  };
  const back2 = () => {
    setShowRegister(!showRegister);
    setShowLogin(!showLogin);
  };
  return (
    <>
      {hideButtons && <Buttons sendTo={sendTo} />}

      {showLogin && (
        <MyLogin
          CompanyProfile={props.CompanyProfile}
          UserProfile={props.UserProfile}
          loginCompany={props.loginCompany}
          logInWorker={props.logInWorker}
          sendTo={sendTo}
          register={Register}
        />
      )}

      {showRegister && <MyRegister login={Login} />}
      {/* </Row> */}
    </>
  );
}
