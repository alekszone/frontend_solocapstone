import React from "react";
import { useState, useEffect } from "react";
import { Form, Col, Button, InputGroup, Row, Container } from "react-bootstrap";
import Styles from "../components/LoginWorker/Login.module.css";
import Buttons from "../components/LoginWorker/Buttons";
import MyLogin from "../components/LoginWorker/MyLogin";
import MyRegister from "../components/LoginWorker/MyRegister";

export default function LoginWorker(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hideButtons, setHideButtons] = useState(true);

  const sendTo = () => {
    setShowLogin(!showLogin);
    // setShowRegister(!showRegister)
    setHideButtons(!hideButtons);
  };
  const back = () => {
    setShowLogin(!showLogin);
    // setShowRegister(!showRegister)
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
      {/* <Row className="m-0 p-0"> */}
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
