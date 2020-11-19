import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { RiImageAddFill } from "react-icons/ri";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Styles from "./Style.module.css";
export default function EditPost(props) {
  const [jobPosition, setjobPosition] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [salary, setsalary] = useState("");
  const [requirments, setRequirments] = useState("");
  const [benefites, setBenefites] = useState("");
  const [type, settype] = useState("");
  const [imagePost, setImage] = useState("");
  const url = process.env.REACT_APP_URL;

  const getSingelPost = async () => {
    const data = await fetch(url + "/post/singelPost/" + props.data, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
    });
    const post = await data.json();

    setjobPosition(post.jobPosition);
    setjobDescription(post.jobDescription);
    setsalary(post.salary);
    setRequirments(post.requirments);
    setBenefites(post.benefites);
    settype(post.type);
  };
  useEffect(() => {
    getSingelPost();
  }, [props.data]);
  console.log(props.data);

  const edited = {
    jobDescription,
    jobPosition,
    salary,
    requirments,
    benefites,
    type,
  };
  const AddNewPost = async () => {
    const result = await fetch(url + "/post/editPost/" + props.data, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(edited),
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data) {
      console.log(data);

      const uploadImage = imagePost;
      const image = new FormData();
      image.append("image", uploadImage);
      const uploadPhoto = await fetch(url + "/post/uploadImage/" + props.data, {
        method: "POST",
        body: image,
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` ,
         
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (uploadPhoto.ok) {
        console.log("uploaded");
        props.fetchPost();
        props.handleClose();
        console.log("uploadd photo is not working");
      } else {
        console.log("uploadd photo is not working");
      }
      props.fetchPost();
      props.handleClose();
    } else {
      props.fetchPost();
      props.handleClose();
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={`${Styles.textStyle}`}
            style={{ textAlign: "center" }}
          >
            <div>
              <h6>Add Job Position</h6>

              <form>
                <TextField
                  id="filled-multiline-flexible"
                  label="Position"
                  className="mb-2"
                  type="text"
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={jobPosition}
                  onChange={(e) => {
                    setjobPosition(e.currentTarget.value);
                  }}
                />
              </form>
            </div>
            <div>
              <h6>Add Job Salary </h6>
              <form>
                <TextField
                  id="filled-multiline-flexible"
                  label="Position"
                  className="mb-2"
                  type="text"
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={salary}
                  onChange={(e) => {
                    setsalary(e.currentTarget.value);
                  }}
                />
              </form>
            </div>
            <div>
              {" "}
              <h6> Job Type </h6>
              {/* <Form.Group controlId="exampleForm.ControlSelect1"> */}
              <FormControl
                variant="outlined"
                style={{
                  width: "100%",
                }}
                className="mb-2"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Job Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Job Type"
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>Type</em>
                  </MenuItem>
                  <MenuItem value={"Full Time"}>Full Time</MenuItem>
                  <MenuItem value={"Part Time"}>Part Time</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <div>
                <h6>Add Position Responsibilities </h6>

                <form>
                  <TextField
                    id="outlined-multiline-static"
                    label="Job Description"
                    multiline
                    className="mb-2"
                    rows={4}
                    style={{
                      width: "100%",
                    }}
                    variant="outlined"
                    value={jobDescription}
                    onChange={(e) => {
                      setjobDescription(e.currentTarget.value);
                    }}
                  />
                </form>
              </div>
              <div>
                <h6>Add Job Requirments </h6>
                <form>
                  <TextField
                    id="outlined-multiline-static"
                    label="Requirments"
                    multiline
                    className="mb-2"
                    rows={4}
                    style={{
                      width: "100%",
                    }}
                    variant="outlined"
                    value={requirments}
                    onChange={(e) => {
                      setRequirments(e.currentTarget.value);
                    }}
                  />
                </form>
              </div>
              <div>
                <h6>Add Job Benefites </h6>

                <form>
                  <TextField
                    id="outlined-multiline-static"
                    label="Benefites"
                    multiline
                    className="mb-2"
                    rows={4}
                    style={{
                      width: "100%",
                    }}
                    variant="outlined"
                    value={benefites}
                    onChange={(e) => {
                      setBenefites(e.currentTarget.value);
                    }}
                  />
                </form>
              </div>
              <h6 className="mt-2 mb-2">Upload Image</h6>
              <label
                htmlFor="file-input"
                aria-required="true"
                //   className={`${Style.uploadPhoto}`}
              >
                <RiImageAddFill style={{ width: "50px", height: "50px" }} />
              </label>
              <input
                style={{ display: "none" }}
                key="image"
                id="file-input"
                type="file"
                accept="image/*"
                profile="file"
                // value={this.state.image}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          className={`${Styles.btngrad}`}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="light"
          className={`${Styles.btngrad}`}
          onClick={() => AddNewPost()}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
