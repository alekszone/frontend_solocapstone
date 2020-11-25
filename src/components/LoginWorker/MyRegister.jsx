import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Styles from "./Login.module.css";
import { Col, Button, Row, Alert } from "react-bootstrap";
import Logo from "./Logo.png";
import TextField from "@material-ui/core/TextField";
const mapStateToProps = (state) => state;
function MyRegister(props) {
  const url = process.env.REACT_APP_URL;
  const [registerWorker, setregisterWorker] = useState(
    props.registerWorker.registerWorker === "worker" ? true : false
  );
  const [registerCompany, setregisterCompany] = useState(
    props.registerWorker.registerWorker === "company" ? true : false
  );
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [portfolioLink, setportfolioLink] = useState("");
  const [position, setPosition] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [website, setwebsite] = useState("");
  const [personel, setpersonel] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [alert, setAlert] = useState(false);
  const [Image, setImage] = useState("");
  const workerData = {
    name,
    surname,
    position,
    aboutMe,
    email,
    password,
    location,
    dateOfBirth,
  };

  const companyData = {
    companyName,
    aboutMe,
    location,
    email,
    password,
    website,
    personel,
  };

  const workerRegister = async () => {
    const register = await fetch(url + "/profile/register", {
      method: "POST",
      body: JSON.stringify(workerData),

      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const data = await register.json();
    if (data) {
      console.log(data, "ca ka data");
      const image = new FormData();
      image.append("image", Image);

      const uploadPhoto = await fetch(url + "/profile/workerImage" + data._id, {
        method: "POST",
        body: image,

        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (uploadPhoto.ok) {
        console.log("hello");
      } else {
        console.log("hello");
      }

      props.login();
    } else {
      setAlert(true);
    }
  };

  const companyRegister = async () => {
    const register = await fetch(url + "/login/register", {
      method: "POST",
      body: JSON.stringify(companyData),

      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const data = await register.json();
    if (data) {
      console.log(data, "xa ka data");
      const image = new FormData();
      image.append("image", Image);

      const uploadPhoto = await fetch(url + "/login/companyImage" + data._id, {
        method: "POST",
        body: image,

        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (uploadPhoto.ok) {
        props.login();
      } else {
        console.log("hello");
      }

      props.login();
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      <Row className={`${Styles.rows}`}>
        {registerWorker && (
          <>
            <Col xs={12} sm={12} md={5} lg={5} className="mt-5">
              <div className={`${Styles.title}`}>
                <img src={Logo} style={{ width: "70%" }} />
                <h4>Find your future job in TECH JOBS</h4>
                <Button onClick={() => props.login()}>Back</Button>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} className="mt-5">
              <div
                style={{
                  height: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="mt-1 mb-4"
              >
                <form
                  className={`${Styles.form1} `}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="First name"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Surname"
                      type="Surname"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Position"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Portfolio Link"
                      type="text"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={portfolioLink}
                      onChange={(e) => setportfolioLink(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Location"
                      type="text"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Birthday Date"
                      type="text"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={dateOfBirth}
                      onChange={(e) => setdateOfBirth(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Email"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Password"
                      type="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mt-2 mb-4">
                    {" "}
                    <TextField
                      id="outlined-multiline-static"
                      label="About Me"
                      multiline
                      rows={4}
                      style={{
                        width: "95%",
                      }}
                      variant="outlined"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.currentTarget.value)}
                    />
                  </div>

                  <div className="mt-2 mb-4">
                    {alert && (
                      <Alert variant="danger" className={`${Styles.input}`}>
                        Please Fill All the fields Correctly
                      </Alert>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="light"
                      className={`${Styles.btngrad} mb-2`}
                      onClick={() => {
                        workerRegister();
                      }}
                    >
                      Register
                    </Button>
                    <br></br>
                    <br></br>
                  </div>
                </form>
              </div>
            </Col>
          </>
        )}

        {registerCompany && (
          <>
            <Col xs={12} sm={12} md={5} lg={5} className="mt-5">
              <div className={`${Styles.title}`}>
                <img src={Logo} style={{ width: "70%" }} />
                <h4>Find your future job in TECH JOBS</h4>
                <Button onClick={() => props.login()}>Back</Button>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} className="mt-5">
              <div
                style={{
                  height: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="mt-1 mb-4"
              >
                <form
                  className={`${Styles.form1} `}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Company Name"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Location"
                      type="text"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Website"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={website}
                      onChange={(e) => setwebsite(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Personel Hired"
                      type="text"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={personel}
                      onChange={(e) => setpersonel(e.currentTarget.value)}
                    />
                  </div>

                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Email"
                      type="text"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Password"
                      type="password"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mt-2 mb-4">
                    {" "}
                    <TextField
                      id="outlined-multiline-static"
                      label="About Me"
                      multiline
                      rows={4}
                      style={{
                        width: "95%",
                      }}
                      variant="outlined"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.currentTarget.value)}
                    />
                  </div>

                  <div className="mt-2 mb-4">
                    {alert && (
                      <Alert variant="danger" className={`${Styles.input}`}>
                        Please Fill All the fields Correctly
                      </Alert>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="light"
                      className={`${Styles.btngrad} mb-2`}
                      onClick={() => {
                        companyRegister();
                      }}
                    >
                      Register
                    </Button>
                    <br></br>
                    <br></br>
                  </div>
                </form>
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}

export default connect(mapStateToProps)(MyRegister);
