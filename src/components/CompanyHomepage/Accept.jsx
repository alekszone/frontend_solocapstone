import React, { useState } from "react";
import { Modal, Button, InputGroup, Alert } from "react-bootstrap";
import Styles from "./Styles.module.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
export default function Accept(props) {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const url = process.env.REACT_APP_URL;
  const showFields = () => {
    setShow(!show);
  };
  const sendEmail = async () => {
    const result = await fetch(
      url + "/aplicationn/sendEmail/" + props.data._id,
      {
        method: "POST",
        body: JSON.stringify({ subject, text }),
        creadentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.ok) {
      console.log("mesage is sent");
      setText("");
      setSubject("");
    } else {
      setAlert(true);
    }
  };

  const acceptAplication = async () => {
    const result = await fetch(
      url + "/aplicationn/" + props.id + "/accept/" + props.data._id,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` ,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.ok) {
      console.log("aplikimi u pranua");
      props.posts();
      props.handleClose();
      props.emptyPorfile();
      setText("");
      setSubject("");
      props.allPosts();
    } else {
      setAlert2(true);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        style={{ top: "40px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Accept Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>
            You are accepting this aplicant .Do you want to send an email?
          </h5>
          <Button
            variant="light"
            // style={{ border: 0 }}
            className={`  ${Styles.btngrad}`}
            onClick={showFields}
          >
            Open Form
          </Button>
          {show && (
            <>
              <h6 className="mt-2">Recipient Email</h6>

              <form>
                <TextField
                  id="filled-multiline-flexible"
                  label="Email"
                  className="mb-2"
                  type="text"
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={props.data.email}
                />
              </form>
              <h6>Subject</h6>
              <form>
                <TextField
                  id="filled-multiline-flexible"
                  label="Subject"
                  className="mb-2"
                  type="text"
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.currentTarget.value)}
                />
              </form>

              <form>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  className="mb-2"
                  rows={4}
                  style={{
                    width: "100%",
                  }}
                  variant="outlined"
                  value={text}
                  onChange={(e) => setText(e.currentTarget.value)}
                />
              </form>

              <Button
                style={{ border: 0 }}
                className={` mt-2 ${Styles.btngrad}`}
                onClick={() => {
                  sendEmail();
                }}
              >
                Send Email
              </Button>

              {alert && (
                <Alert variant="danger">Please Check Your Inputs Better</Alert>
              )}
            </>
          )}
          {alert2 && (
            <Alert variant="danger">This user cannot be accepted</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ border: 0 }}
            className={`  ${Styles.btngrad}`}
            onClick={() => {
              acceptAplication();
            }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
