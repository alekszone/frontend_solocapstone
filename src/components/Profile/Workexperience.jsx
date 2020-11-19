import React, { Component } from "react";
import { Modal, Button, InputGroup, Row, Col } from "react-bootstrap";

import { RiImageAddFill } from "react-icons/ri";

import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Grid from "@material-ui/core/Grid";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

import TextField from "@material-ui/core/TextField";

import Styles from "./Styles.module.css";
const url = process.env.REACT_APP_URL;
export default class Workexperience extends Component {
  state = {
    experiences: [],
    postExperience: {
      workExperience: "",
      description: "",
      started: "",
      finished: "",
      workPosition: "",
    },
    image: "",
    postId: "",
    editShow: false,
    show: false,
    postData: [],
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => {
    this.setState({ show: true });
    this.setState({
      postExperience: {
        ...this.state.postExperience,

        workExperience: "",
        description: "",
        started: "",
        finished: "",
        workPosition: "",
      },
    });
  };

  editClose = () => this.setState({ editShow: false });
  editShow = (data) => {
    this.setState({ editShow: true });
    this.setState({
      postExperience: {
        ...this.state.postExperience,
        workExperience: data.workExperience,
        description: data.description,
        started: data.started,
        finished: data.finished,
        workPosition: data.workPosition,
      },
    });
    this.setState({ postId: data._id });
  };

  componentDidMount = async () => {
    this.fetchData();
  };
  fetchData = async () => {
    const getExperience = await fetch(url + `/workExperience/workExperience`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getExperience.json();
    this.setState({ experiences: data });
    console.log(data, "where are the data");
  };

  postExperience = async () => {
    const getExperience = await fetch(url + `/workExperience/postWork`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ ...this.state.postExperience }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const id = await getExperience.json();
    console.log(id, "what have inside");
    if (id) {
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        url + `/workExperience/uploadImage/` + id._id,
        {
          method: "POST",
          credentials: "include",
          body: image,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await uploadPhoto.json();
      if (data) {
        console.log("imazhi u shtua");

        console.log(data, "hhsbjbsdjjhsbdjbsdv");
      }
      //   this.fetchData();
      this.setState({
        postExperience: {
          ...this.state.postExperience,

          workExperience: "",
          description: "",
          started: "",
          finished: "",
          workPosition: "",
        },
      });
      this.setState({ image: "" });
      //   this.fetchData();
      if (data) {
        this.setState({ experiences: [...this.state.experiences, data] });
      } else {
        this.setState({ experiences: [...this.state.experiences, id] });
      }
    } else {
      console.log("the answer is empty");
    }
  };

  editExperience = async () => {
    console.log(this.state.postId, "kosdvsdojmsdm");
    console.log(this.state.ex, "kosdvsdojmsdm");
    const getExperience = await fetch(
      url + `/workExperience/edit/` + this.state.postId,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ...this.state.postExperience }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await getExperience.json();
    if (data) {
      console.log(data, "what edit brings");
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        url + `/workExperience/uploadImage/` + data._id,
        {
          method: "POST",
          credentials: "include",
          body: image,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (uploadPhoto.ok) {
        console.log("imazhi u shtua");
      }
      this.fetchData();
      this.setState({
        postExperience: {
          ...this.state.postExperience,

          workExperience: "",
          description: "",
          started: "",
          finished: "",
          workPosition: "",
        },
      });
      this.fetchData();
    }
  };

  deleteExperience = async (id) => {
    const getExperience = await fetch(url + `/workExperience/delete/` + id, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (getExperience.ok) {
      console.log("is deleted");
      //   this.state.experiences();
      this.fetchData();
    }
  };

  render() {
    console.log(this.state.image, "ca ka mrena");
    return (
      <>
        <Row className={`${Styles.myPosts}`}>
          <Col xs={12} sm={12} md={12} lg={12} className="text-center ">
            <Button
              style={{
                fontSize: "15px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={this.handleShow}
            >
              Add Experiences
            </Button>
          </Col>

          {this.state.experiences && this.state.experiences.length > 0 ? (
            <>
              {this.state.experiences &&
                this.state.experiences.map((data) => {
                  return (
                    <>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <div className={`${Styles.carts} mt-3`}>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              boxShadow:
                                "3px 3px 3px  rgba(212, 212, 212, 0.938)",

                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <Col
                              xs={4}
                              sm={4}
                              md={4}
                              lg={4}
                              style={{ height: "120px" }}
                            >
                              {data.image ? (
                                <img
                                  src={data.image}
                                  style={{
                                    width: "90%",
                                    height: "90%",
                                    // objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                  className="mt-1  ml-1"
                                />
                              ) : (
                                <img
                                  src="https://ianmartin.com/wp-content/uploads/2017/10/WhatE28099s20the20Best20Day20of20the20Week20to20Post20a20Job20Ad-1030x687.jpg"
                                  style={{
                                    width: "90%",
                                    height: "90%",
                                    // objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                  className="mt-1 ml-1"
                                />
                              )}
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} className="mt-1">
                              <h5 className={`${Styles.headTitle} mt-2 ml-2`}>
                                {data.workExperience}
                              </h5>
                              <h5 className={`${Styles.jobPosition} ml-2`}>
                                {data.workPosition}
                              </h5>
                              <h6 className={`${Styles.salary} ml-2`}>
                                {data.started}-{data.finished}
                              </h6>
                            </Col>
                            <Col
                              xs={2}
                              sm={2}
                              md={2}
                              lg={2}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "right",
                              }}
                            >
                              <RiDeleteBinLine
                                className={`${Styles.icon} mt-3`}
                                onClick={() => this.deleteExperience(data._id)}
                              />

                              <AiOutlineEdit
                                className={`${Styles.icon} mt-3`}
                                onClick={() => this.editShow(data)}
                              />
                            </Col>
                          </Row>

                          <div className={`${Styles.aboutCarts} ml-1 mr-1`}>
                            <h5 className={`${Styles.headTitle} ml-2 mt-2`}>
                              Experience Description
                            </h5>
                            {data.description ? (
                              <p className={`${Styles.aboutMe}`}>
                                {data.description}
                              </p>
                            ) : (
                              <p>No Description Detail . </p>
                            )}
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}{" "}
            </>
          ) : (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <div className="mt-5">
                <h6>You have no Experiences</h6>
                <img
                  className="mt-0"
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            </Col>
          )}
        </Row>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Work Eperience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={`${Styles.textStyle}`}>
              <h6
                style={{ textAlign: "center" }}
                className={`${Styles.textStyle}`}
              >
                Company
              </h6>

              <form>
                <TextField
                  id="filled-multiline-flexible"
                  label="Company"
                  className="mb-2"
                  type="text"
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={this.state.postExperience.workExperience}
                  onChange={(e) =>
                    this.setState({
                      postExperience: {
                        ...this.state.postExperience,
                        workExperience: e.currentTarget.value,
                      },
                    })
                  }
                />
              </form>
              <h6
                style={{ textAlign: "center" }}
                className={`${Styles.textStyle}`}
              >
                Position
              </h6>

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
                  value={this.state.postExperience.workPosition}
                  onChange={(e) =>
                    this.setState({
                      postExperience: {
                        ...this.state.postExperience,
                        workPosition: e.currentTarget.value,
                      },
                    })
                  }
                />
              </form>

              <h6
                style={{ textAlign: "center" }}
                className={`${Styles.textStyle}`}
              >
                Work Description
              </h6>

              <form>
                <TextField
                  id="outlined-multiline-static"
                  label="Work Description"
                  multiline
                  className="mb-2"
                  rows={4}
                  style={{
                    width: "100%",
                  }}
                  variant="outlined"
                  value={this.state.postExperience.description}
                  onChange={(e) =>
                    this.setState({
                      postExperience: {
                        ...this.state.postExperience,
                        description: e.currentTarget.value,
                      },
                    })
                  }
                />
              </form>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className={`${Styles.textStyle}`}
              >
                <div>
                  {" "}
                  <h6 style={{ textAlign: "center" }}>Started</h6>
                  <form>
                    <TextField
                      id="filled-multiline-flexible"
                      label="Started"
                      className="mb-2"
                      type="date"
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      type="text"
                      value={this.state.postExperience.started}
                      onChange={(e) =>
                        this.setState({
                          postExperience: {
                            ...this.state.postExperience,
                            started: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
                <div className={`${Styles.textStyle}`}>
                  <h6 style={{ textAlign: "center" }}>End Date</h6>

                  <form>
                    <TextField
                      id="filled-multiline-flexible"
                      label="Started"
                      className="mb-2"
                      type="date"
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      type="text"
                      value={this.state.postExperience.finished}
                      onChange={(e) =>
                        this.setState({
                          postExperience: {
                            ...this.state.postExperience,
                            finished: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={`${Styles.textStyle}`}
              >
                <h6> Upload Image</h6>

                <label
                  htmlFor="file-input"
                  aria-required="true"
                  //   className={`${Style.uploadPhoto}`}
                >
                  {/* <RiImageAddFill style={{ width: "50px", height: "50px" }} /> */}
                </label>
                <input
                  key="image"
                  id="file-input"
                  type="file"
                  accept="image/*"
                  profile="file"
                  // value={this.state.image}
                  onChange={(e) => this.setState({ image: e.target.files[0] })}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={this.handleClose}
            >
              Close
            </Button>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={() => {
                this.postExperience();

                this.handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.editShow}
          onHide={this.editClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Eperience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={`${Styles.textStyle}`}>
              <h6
                style={{ textAlign: "center" }}
                className={`${Styles.textStyle}`}
              >
                Company
              </h6>

              <form>
                <TextField
                  id="filled-multiline-flexible"
                  label="Company"
                  className="mb-2"
                  type="text"
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={this.state.postExperience.workExperience}
                  onChange={(e) =>
                    this.setState({
                      postExperience: {
                        ...this.state.postExperience,
                        workExperience: e.currentTarget.value,
                      },
                    })
                  }
                />
              </form>
              <h6
                style={{ textAlign: "center" }}
                className={`${Styles.textStyle}`}
              >
                Position
              </h6>

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
                  value={this.state.postExperience.workPosition}
                  onChange={(e) =>
                    this.setState({
                      postExperience: {
                        ...this.state.postExperience,
                        workPosition: e.currentTarget.value,
                      },
                    })
                  }
                />
              </form>

              <h6
                style={{ textAlign: "center" }}
                className={`${Styles.textStyle}`}
              >
                Work Description
              </h6>

              <form>
                <TextField
                  id="outlined-multiline-static"
                  label="Work Description"
                  multiline
                  className="mb-2"
                  rows={4}
                  style={{
                    width: "100%",
                  }}
                  variant="outlined"
                  value={this.state.postExperience.description}
                  onChange={(e) =>
                    this.setState({
                      postExperience: {
                        ...this.state.postExperience,
                        description: e.currentTarget.value,
                      },
                    })
                  }
                />
              </form>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className={`${Styles.textStyle}`}
              >
                <div>
                  {" "}
                  <h6 style={{ textAlign: "center" }}>Started</h6>
                  <form>
                    <TextField
                      id="filled-multiline-flexible"
                      label="Started"
                      className="mb-2"
                      type="date"
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      type="text"
                      value={this.state.postExperience.started}
                      onChange={(e) =>
                        this.setState({
                          postExperience: {
                            ...this.state.postExperience,
                            started: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
                <div className={`${Styles.textStyle}`}>
                  <h6 style={{ textAlign: "center" }}>End Date</h6>

                  <form>
                    <TextField
                      id="filled-multiline-flexible"
                      label="Started"
                      className="mb-2"
                      type="date"
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      type="text"
                      value={this.state.postExperience.finished}
                      onChange={(e) =>
                        this.setState({
                          postExperience: {
                            ...this.state.postExperience,
                            finished: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={`${Styles.textStyle}`}
              >
                <h6> Upload Image</h6>

                <label
                  htmlFor="file-input"
                  aria-required="true"
                  // className={`${Style.uploadPhoto}`}
                >
                  {/* <RiImageAddFill style={{ width: "50px", height: "50px" }} /> */}
                </label>

                <input
                  key="image"
                  id="file-input"
                  type="file"
                  accept="image/*"
                  profile="file"
                  // value={this.state.image}
                  onChange={(e) => this.setState({ image: e.target.files[0] })}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={this.editClose}
            >
              Close
            </Button>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={() => {
                this.editExperience();

                this.editClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
