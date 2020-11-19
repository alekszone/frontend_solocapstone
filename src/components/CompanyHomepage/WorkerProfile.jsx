import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkExperience from "./Workexperience";
import Education from "./Education";
import Accept from "./Accept";
import Remove from "./Remove";
import Styles from "./Styles.module.css";
export default function WorkerProfile(props) {
  const [showEducation, setshowEducation] = useState(false);
  const [showWork, setshowWork] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [profile, setprofile] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [accept, setAccept] = useState(false);
  const [remove, setRemove] = useState(false);
  const [dataAccept, setdataAccept] = useState([]);
  const [dataRemove, setdataRemove] = useState([]);
  const url = process.env.REACT_APP_URL;

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setData(data);
    setShow(true);
  };
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (data) => {
    console.log(data, "caka data");
    setData1(data);
    setShow1(true);
  };

  const closeAccept = () => setAccept(false);
  const showAccept = (data) => {
    console.log(data, "caka data");
    setdataAccept(data);
    setAccept(true);
  };
  const closeRemove = () => setRemove(false);
  const showRemove = (data) => {
    console.log(data, "caka data");
    setdataRemove(data);
    setRemove(true);
  };

  const emptyPorfile = () => {
    setprofile([]);
  };

  useEffect(() => {
    fetchWorker();
  }, [props.profile]);
  const fetchWorker = async () => {
    const result = await fetch(url + "/login/singleProfile/" + props.profile, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data) {
      setprofile(data);
      console.log(data[0].education);
      if (data[0].education && data[0].education.length > 0) {
        setshowEducation(true);
      } else {
        setshowEducation(false);
      }
      if (data[0].workExperience && data[0].workExperience.length > 0) {
        setshowWork(true);
      } else {
        setshowWork(false);
      }
    } else {
      console.log("no data");
    }
  };
  return (
    <>
      {profile &&
        profile.map((data) => {
          return (
            <>
              <Row>
                <Col xs={12} sm={12} md={4} lg={4} className="pl-0">
                  <div className={`${Styles.cartblock1} mt-5 ml-0 mb-2 pb-2`}>
                    {data.image ? (
                      <img
                        src={data.image}
                        className="img-responsive mt-3 mb-3"
                        alt=""
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <img
                        src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png"
                        className="img-responsive mt-2"
                        alt=""
                      />
                    )}
                    <h3>
                      {data.name} {data.surname}
                    </h3>
                    {/* <h6>{data.position}</h6> */}
                    <h6>{data.position}</h6>
                    <h6>{data.email}</h6>
                    <h6>{data.location}</h6>
                    <h6>{data.dateOfBirth && data.dateOfBirth.slice(0, 10)}</h6>
                    <h6>
                      <Link href={data.portfolioLink}>
                        {data.portfolioLink}{" "}
                      </Link>
                    </h6>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                    className="mb-2"
                  >
                    <Button
                      // style={{ border: 0 ,}}
                      className={` mr-4 ${Styles.btngrad}`}
                      onClick={() => showRemove(data)}
                    >
                      Remove
                    </Button>

                    <Button
                      // style={{ border: 0 }}
                      className={` ml-5  ${Styles.btngrad}`}
                      onClick={() => showAccept(data)}
                    >
                      Accept
                    </Button>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} className="text-left mt-5">
                  <Tabs
                    className="mt-2"
                    defaultActiveKey="Aboutme"
                    id="uncontrolled-tab-example"
                    className={`${Styles.tabnav}`}
                  >
                    <Tab
                      eventKey="Aboutme"
                      title="About Me"
                      className={` mt-2 text-left`}
                    >
                      <Row className={`${Styles.aboutme} ${Styles.data}`}>
                        <p
                          className="m-1 p-1"
                          style={{
                            textAlign: "justify ",
                            textJustify: "inter-word",
                          }}
                        >
                          {data.aboutMe}
                        </p>
                      </Row>
                    </Tab>
                    <Tab
                      eventKey="education"
                      title="Education"
                      className="mt-2"
                    >
                      <Row
                        className={` ${Styles.aboutme} justify-content-space-around text-left `}
                      >
                        {data.education && data.education.length > 0 && (
                          <>
                            <Col xs={4} sm={4} md={4} lg={4}>
                              {data.education[0].image ? (
                                <img
                                  src={data.education[0].image}
                                  className={`${Styles.images} mt-3 ml-1`}
                                  style={{ borderRadius: 0 }}
                                />
                              ) : (
                                <img
                                  src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                                  className={`${Styles.images} mt-3  ml-1`}
                                  style={{ borderRadius: 0 }}
                                />
                              )}
                            </Col>
                            <Col
                              xs={8}
                              sm={8}
                              md={8}
                              lg={8}
                              style={{ height: "auto" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <h5 className="mt-2">
                                  {data.education[0].schoolName}
                                </h5>
                                <p className="ml-5  mt-2">
                                  <i>
                                    {data.education[0].startDate} -
                                    {data.education[0].endDate}{" "}
                                  </i>
                                </p>
                              </div>
                              <div className={`${Styles.dataUser1} mt-2`}>
                                <h5>About</h5>
                                <p>{data.education[0].about}</p>
                              </div>
                              <div className={`${Styles.dataUser1} mt-2`}>
                                <h5>Skill Learned</h5>
                                <p>{data.education[0].skillsLearned}</p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {showEducation && (
                                  <Button
                                    variant="light"
                                    // className={`${Styles.btngrad}`}
                                    style={{
                                      color: " #48546d",
                                      fontWeight: "bolder",
                                    }}
                                    onClick={() => handleShow1(data.education)}
                                  >
                                    See All
                                  </Button>
                                )}
                              </div>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Tab>
                    <Tab
                      eventKey="workExperience"
                      title="Works "
                      className={` mt-2`}
                    >
                      <Row
                        className={`${Styles.aboutme} justify-content-space-bettwen text-left `}
                      >
                        {data.workExperience && data.workExperience.length > 0 && (
                          <>
                            <Col xs={4} sm={4} md={4} lg={4}>
                              {data.workExperience[0].image ? (
                                <img
                                  src={data.workExperience[0].image}
                                  className={`${Styles.images} mt-2 ml-1`}
                                  style={{ borderRadius: 0 }}
                                />
                              ) : (
                                <img
                                  src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                                  className={`${Styles.images} mt-2  ml-1`}
                                  style={{ borderRadius: 0 }}
                                />
                              )}
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8}>
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <h5 className="mt-2">
                                  {data.workExperience[0].workExperience}
                                </h5>
                                <p className="ml-5  mt-2">
                                  <i>
                                    {data.workExperience[0].started} -
                                    {data.workExperience[0].finished}{" "}
                                  </i>
                                </p>
                              </div>

                              <p>{data.workExperience[0].workPosition}</p>
                              <div className={`${Styles.dataUser}`}>
                                <h5>Description</h5>
                                <p>{data.workExperience[0].description}</p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {showWork && (
                                  <Button
                                    variant="light"
                                    // className={`${Styles.btngrad}`}
                                    style={{
                                      color: " #48546d",
                                      fontWeight: "bolder",
                                    }}
                                    className="mt-2"
                                    onClick={() =>
                                      handleShow(data.workExperience)
                                    }
                                  >
                                    See All
                                  </Button>
                                )}
                              </div>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Tab>
                    <Tab eventKey="skills" title="Skills">
                      {data.skills &&
                        data.skills.map((info) => {
                          return (
                            <>
                              <Button
                                variant="light"
                                className={`ml-1 mt-1 ${Styles.aboutme}`}
                                style={{ height: "auto" }}
                              >
                                {info.skillName ? (
                                  <p>{info.skillName}</p>
                                ) : (
                                  <h5>No skills </h5>
                                )}
                              </Button>
                            </>
                          );
                        })}
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </>
          );
        })}
      <WorkExperience
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        workExperience={data}
      />
      <Education
        show={show1}
        handleClose={handleClose1}
        handleShow={handleShow1}
        education={data1}
      />
      <Accept
        show={accept}
        handleClose={closeAccept}
        handleShow={showAccept}
        data={dataAccept}
        id={props.id}
        posts={props.allPost}
        emptyPorfile={emptyPorfile}
        allPosts={props.allPosts}
      />
      <Remove
        show={remove}
        handleClose={closeRemove}
        handleShow={showRemove}
        data={dataRemove}
        id={props.id}
        posts={props.allPost}
        emptyPorfile={emptyPorfile}
        allPosts={props.allPosts}
      />
    </>
  );
}
