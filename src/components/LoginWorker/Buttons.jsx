import React, { Component } from "react";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Logo from "./Logo.png";
import { BsSearch } from "react-icons/bs";
import { RiChatCheckLine } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { VscBriefcase } from "react-icons/vsc";
import TextField from "@material-ui/core/TextField";
import Styles from "./Login.module.css";
import { connect } from "react-redux";
import Company from "./company.jpg";

import User from "./user.png";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  log: (data) =>
    dispatch({
      type: "ADD_DATA",
      payload: data,
    }),
});

class Buttons extends Component {
  state = {
    worker: "worker",
    company: "company",
  };

  addToReducer = () => {
    if (this.state.worker) {
      this.props.log(this.state.worker);
      if (this.props.log.ok) {
        console.log("aded");
      }
    } else {
      console.log("no data aded");
    }
  };

  addToReduce = () => {
    if (this.state.company) {
      this.props.log(this.state.company);
    } else {
      console.log("no data aded");
    }
  };

  render() {
    return (
      <>
        <Row className={`${Styles.bgImage} m-0 p-0`}>
          {" "}
          <div className={`${Styles.title}`}>
            <img src={Logo} style={{ width: "45%" }} />
            <h4 style={{ color: " rgb(236, 108, 34)", fontWeight: "bolder" }}>
              Find your future job in TECH JOBS
            </h4>
          </div>
          <div
            className="mt-4 mb-4"
            style={{
              // backgroundColor: "rgb(238, 238, 238)",
              width: "90%",
              backgroundColor: "transparent",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "5px",
              // boxShadow: "0px 5px 5px rgba(180, 179, 179, 0.938)",
            }}
          >
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h4
                  className="mt-3"
                  style={{
                    color: " rgb(236, 108, 34)",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  Welcome To Tech Jobs!
                </h4>
              </Col>

              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  className={`mt-4 mb-5 ${Styles.loginsCart}`}
                  onClick={(e) => {
                    this.props.sendTo();
                    this.addToReducer();
                  }}
                  style={{
                    width: "180px",
                    height: "220px",
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                    backgroundColor: "rgb(10,120,178)",
                    borderRadius: "5px",
                    color: "white",
                    boxShadow: "0px 5px 5px rgba(180, 179, 179, 0.938)",
                    marginRight: "200px",
                  }}
                >
                  <img
                    src={User}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                    className="mt-5"
                  />

                  <h6 className="mt-3">Worker</h6>
                  <Button className={`${Styles.btngrad} mt-2`}>Log In</Button>
                </div>

                <div
                  className="mt-4 mb-5"
                  onClick={(e) => {
                    this.props.sendTo();
                    this.addToReduce();
                  }}
                  style={{
                    width: "180px",
                    height: "220px",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(10,120,178)",
                    borderRadius: "5px",
                    color: " white",
                    boxShadow: "0px 5px 5px rgba(180, 179, 179, 0.938)",
                  }}
                >
                  <img
                    src={Company}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                    className="mt-5"
                  />

                  <h6 className="mt-3">Company</h6>
                  <Button className={`${Styles.btngrad} mt-2`}>Log In</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
        <Row className="m-0 p-0">
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              width: "100%",
              height: "auto",
            }}
            // className={`  ${Styles.clear}`}
          >
            <div
              className="mt-4 mb-4"
              style={{
                backgroundColor: "rgb(10,120,178)",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "5px",
                boxShadow: "0px 5px 5px rgba(180, 179, 179, 0.938)",
              }}
            >
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "30%",
                  }}
                >
                  <Image
                    className={` mt-2 mb-2 ${Styles.profileImage}`}
                    variant="top"
                    src="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2019/11/jobs-1574510609.jpg"
                  />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div>
                    <h3
                      className="mt-3"
                      style={{
                        color: " rgb(236, 108, 34)",
                        fontWeight: "bolder",
                        textAlign: "center",
                      }}
                    >
                      About{" "}
                    </h3>

                    <Card.Text
                      className={`mr-2 ml-2 mb-2 mt-4 text-left ${Styles.subTitle} ${Styles.textJustify}`}
                      style={{ color: "white" }}
                    >
                      Here you are going to find the newest jobs by the
                      Technology Companies or find the best workes.
                      <br />
                      Apply to jobs anytime, anywhere and get notified instantly
                      when your application is reviewed.
                    </Card.Text>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>{" "}
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              width: "100%",
            }}
          >
            <Row
              className="mt-4 mb-4"
              style={{
                // backgroundColor: "rgb(238, 238, 238)",
                width: "90%",
                backgroundColor: "white",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "5px",
                boxShadow: "0px 5px 5px rgba(180, 179, 179, 0.938)",
              }}
            >
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h4
                  className="mt-3"
                  style={{ color: " rgb(236, 108, 34)", fontWeight: "bolder" }}
                >
                  How Tech Jobs Work
                </h4>
              </Col>

              <Col
                xs={6}
                sm={6}
                md={3}
                lg={3}
                className="mt-3 mb-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    color: "#48546d ",
                    fontSize: "23px",
                  }}
                >
                  <BsSearch className={`${Styles.icons}`} />
                  <h6 className={`mt-2`}>Find the Right Job</h6>
                </div>
              </Col>
              <Col
                xs={6}
                sm={6}
                md={3}
                lg={3}
                className="mt-3 mb-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    color: "#48546d ",
                    fontSize: "23px",
                  }}
                >
                  <RiChatCheckLine className={`${Styles.icons}`} />
                  <h6 className={`mt-2`}>Research Companies</h6>
                </div>
              </Col>
              <Col
                xs={6}
                sm={6}
                md={3}
                lg={3}
                className="mt-3 mb-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    color: "#48546d ",
                    fontSize: "23px",
                  }}
                >
                  <AiOutlineDollarCircle className={`${Styles.icons}`} />
                  <h6 className={`mt-2`}> Compare Salaries</h6>
                </div>
              </Col>
              <Col
                className={` my-auto `}
                xs={6}
                sm={6}
                md={3}
                lg={3}
                className="mt-3 mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    color: "#48546d ",
                    fontSize: "23px",
                  }}
                >
                  <VscBriefcase className={`${Styles.icons}`} />
                  <h6 className={`mt-2`}> Apply To Jobs</h6>
                </div>
              </Col>
              {/* </Row> */}
            </Row>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              width: "100%",
            }}
          >
            <Row
              className="mt-4 mb-4"
              style={{
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Col xs={12} sm={12} md={12} lg={12} className="mt-2">
                <div
                  style={{
                    height: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="mt-2 mb-2"
                >
                  <form
                    className={`${Styles.form} `}
                    noValidate
                    autoComplete="off"
                  >
                    {" "}
                    <h4
                      className={`mt-2 mb-4`}
                      style={{
                        alignItems: "center",
                        color: " rgb(236, 108, 34)",
                        fontWeight: "bolder",
                      }}
                    >
                      {" "}
                      Contact Us
                    </h4>
                    <div className="mt-2 mb-4">
                      <TextField
                        id="filled-multiline-flexible"
                        label="First Name"
                        variant="outlined"
                        style={{
                          width: "90%",
                        }}
                      />
                    </div>
                    <div className="mt-2 mb-4">
                      <TextField
                        id="filled-multiline-flexible"
                        label="Email"
                        variant="outlined"
                        style={{
                          width: "90%",
                        }}
                      />
                    </div>
                    <div className="mt-2 mb-4">
                      <TextField
                        id="outlined-multiline-static"
                        label="Subject"
                        multiline
                        rows={4}
                        style={{
                          width: "90%",
                        }}
                        variant="outlined"
                      />
                    </div>
                    <Button
                      variant="light"
                      className={`${Styles.btngrad} mb-2`}
                      style={{ width: "100px" }}
                    >
                      Send
                    </Button>
                  </form>{" "}
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Row
              style={{
                color: "#48546d ",
                fontSize: "23px",
                backgroundColor: "white",
                bottom: 0,
              }}
            >
              <Col xs={4} className="text-center "></Col>
              <Col
                xs={4}
                className="text-center "
                // style={{
                //   backgroundColor: "white",
                //   boxShadow: "5px 5px 5px rgba(212, 212, 212, 0.938)",
                //   borderRadius: "20px",
                // }}
              >
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a style={{ textDecoration: "none" }} href="/">
                  Tech Jobs
                </a>
              </Col>
              <Col xs={4} className="text-right  "></Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Buttons)
);
