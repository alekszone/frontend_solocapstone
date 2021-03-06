import React, { Component } from "react";
import { Row, Col, Tab, Tabs, Button, Modal } from "react-bootstrap";
import Loader from "../Loader/Loader";
import Styles from "./Styles.module.css";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
const url = process.env.REACT_APP_URL;
class Inside extends Component {
  state = {
    allPost: [],
    comp: [],
    companie: [],
    companies: false,
    showModal: false,
    projetc: 0,
    filter: [],
    title: "",
    aplication: [],
    allJobPost: [],
    showButton: true,
    hideButton: false,
    myProfile: {},
    aplication: [],
    loader: true,
  };

  componentDidMount = async () => {
    const response = await fetch(url + "/profile/allCompanies", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const fetchedUsers = await response.json();

    this.setState({ comp: fetchedUsers });
    this.setState({ companie: fetchedUsers[0] });

    const result = await fetch(url + `/profile/allPostJobs`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(this.state.title, "titttttle");
    const fetchedPost = await result.json();
    this.setState({ allPost: fetchedPost });
    this.setState({ allJobPost: fetchedPost });
    this.setState({ filter: fetchedPost[0] });

    this.fetchProfile();
    this.fetchData();
  };

  fetchProfile = async () => {
    const result = await fetch(url + "/profile/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      setTimeout(() => {
        this.setState({ loader: false });
      }, 1200);
      const data = await result.json();
      this.setState({ myProfile: data });
      console.log(data);
    }
  };

  showCompanies = (e) => {
    const userId = e.userID;
    const postId = e._id;

    const findCompani = this.state.comp.find((x) => x._id === userId);
    const findPost = this.state.allPost.find((x) => x._id === postId);
    console.log(findPost, "this is the post");
    console.log(findCompani, "thisis company");
    this.setState({ filter: findPost });
    this.setState({ companie: findCompani });
    this.checkAply(e);
  };

  filterPost = (e) => {
    console.log(e);
    const text = e;
    if (text) {
      const filterPost = this.state.allPost.filter((x) =>
        x.jobPosition.toLowerCase().includes(text.toLowerCase())
      );
      if (filterPost) {
        this.setState({ allPost: filterPost });
      }
    } else {
      this.setState({ allPost: this.state.allJobPost });
    }
  };

  toogle = () => {
    if (this.state.companies === false) {
      this.setState({ companies: true });
    } else {
      this.setState({ companies: false });
    }
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  fetchData = async () => {
    const aplication = await fetch(url + `/aplication/getAllAplication`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const getAllAplication = await aplication.json();
    this.setState({ aplication: getAllAplication });
  };
  checkAply = (e) => {
    console.log(this.state.aplication);
    if (
      this.state.aplication &&
      this.state.aplication.find((x) => x.postId[0]._id === e._id)
    ) {
      console.log(
        this.state.aplication &&
          this.state.aplication.find((x) => x.postId[0]._id === e._id),
        "what has inside   "
      );
      console.log(e._id, "what has inside   ");
      this.setState({ hideButton: true });
      this.setState({ showButton: false });
      console.log(" u bo , u kry");
    } else {
      this.setState({ hideButton: false });
      this.setState({ showButton: true });
      console.log(" nuk bohe ,nuk kry");
    }
  };
  aplyForJob = async () => {
    const aply = await fetch(
      url + "/aplication/aply/" + this.state.filter._id,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (aply.ok) {
      alert("Your Aplication  Was Ok");
      console.log("u kry me sukses");
      this.fetchData();
    } else {
    }
  };

  render() {
    return (
      <>
        <Row className={`text-center  ${Styles.search}`}>
          {this.state.loader ? (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              <Loader />{" "}
            </Col>
          ) : (
            <>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={5}
                className={`${Styles.company} mt-3 `}
              >
                <Row className={`  ${Styles.row1}`}>
                  <div
                    className={`${Styles.cartblock1} `}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {this.state.myProfile && this.state.myProfile.image ? (
                      <img
                        src={this.state.myProfile.image}
                        className={` mt-2 mb-2`}
                        style={{
                          borderRadius: "none !important",
                        }}
                      />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-Tom5eAUi7AaarN_g-WIkVxvRNhdHa8BrQ&usqp=CAU"
                        className={` mt-2 mb-2`}
                        style={{
                          borderRadius: "none !important",
                        }}
                      />
                    )}
                    <div
                      className="mt-4"
                      // style={{
                      //   height: 'auto',
                      // }}
                    >
                      <h5 className={`${Styles.jobPosition}`}>
                        {this.state.myProfile && this.state.myProfile.name}{" "}
                        {this.state.myProfile && this.state.myProfile.surname}
                      </h5>
                      <h6 className={`${Styles.salary}`}>
                        {this.state.myProfile && this.state.myProfile.position}
                      </h6>
                      <h6 className={`${Styles.salary}`}>
                        {this.state.myProfile && this.state.myProfile.email}
                      </h6>
                    </div>
                  </div>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{
                        backgroundColor: "white",
                        zIndex: "10",
                        position: "-webkit-sticky",
                        position: "sticky",
                        top: "0",
                      }}
                      className="mt-1"
                    >
                      <form>
                        <TextField
                          id="filled-multiline-flexible"
                          label="Search by Job Position"
                          type="text"
                          variant="outlined"
                          style={{
                            width: "100%",
                            backgroundColor: "white",
                          }}
                          type="text"
                          onChange={(e) =>
                            this.filterPost(e.currentTarget.value)
                          }
                        />
                      </form>{" "}
                      {/* 
                  <input
                    type='text'
                    className={`${Styles.text}`}
                    placeholder='Search by job position'
                    onChange={(e) => this.filterPost(e.currentTarget.value)}
                  /> */}
                    </div>

                    <div className={` ${Styles.about}`}>
                      {this.state.allPost &&
                        this.state.allPost.map((data, i) => (
                          <>
                            <Row
                              className={`${Styles.cards} e-card e-card-horizontal mt-2`}
                              onClick={() => this.showCompanies(data)}
                            >
                              <Col xs={5} sm={5}>
                                {data.image ? (
                                  <img
                                    className={`${Styles.img} ml-1 mt-1 mb-1`}
                                    src={data.image}
                                    alt="Sample"
                                  />
                                ) : (
                                  <img
                                    className="ml-1"
                                    src="https://www.justice.gov.il/ArticlesPhotos/blue-folders-magni.jpg"
                                    alt="Sample"
                                    className={`${Styles.img} ml-1 mt-1 mb-1`}
                                  />
                                )}
                              </Col>
                              <Col xs={7} sm={7} className="mt-1">
                                <div>
                                  <h5 className={`${Styles.headTitle}`}>
                                    {data.companyName}
                                  </h5>
                                </div>

                                <div>
                                  {" "}
                                  <h5 className={`${Styles.jobPosition}`}>
                                    {data.jobPosition}
                                  </h5>
                                </div>

                                <div>
                                  <p className={`${Styles.type}`}>
                                    {data.location}
                                  </p>
                                </div>
                                <div>
                                  <p className={`${Styles.salary}`}>
                                    ${data.salary}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </>
                        ))}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={7}
                className={`${Styles.company} mt-3`}
              >
                <Row className={`${Styles.row2}`}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    className={`${Styles.infoCards}`}
                  >
                    <div className="text-left mt-2 ml-3">
                      <div>
                        {this.state.filter && this.state.filter.jobPosition ? (
                          <h5 className={`${Styles.jobPosition}`}>
                            {this.state.filter.jobPosition}
                          </h5>
                        ) : (
                          <h5 className={`${Styles.jobPosition}`}>
                            No Position
                          </h5>
                        )}
                      </div>

                      <div>
                        {this.state.filter && this.state.filter.location ? (
                          <p className={`${Styles.type}`}>
                            {this.state.filter.location}
                          </p>
                        ) : (
                          <p className={`${Styles.type}`}>No Location</p>
                        )}
                      </div>
                      <div>
                        {this.state.filter && this.state.filter.salary ? (
                          <p className={`${Styles.salary}`}>
                            ${this.state.filter.salary}
                          </p>
                        ) : (
                          <p className={`${Styles.salary}`}>No Salary</p>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        marginLeft: "auto",
                        marginTop: "35px",
                        marginRight: "15px",
                      }}
                    >
                      {this.state.showButton && (
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            this.showModal();
                          }}
                          className={`${Styles.btngrad}`}
                        >
                          Apply
                        </Button>
                      )}
                      {this.state.hideButton && (
                        <Button
                          type="button"
                          variant="light"
                          className={`${Styles.btngrad}`}
                        >
                          Applied
                        </Button>
                      )}
                    </div>
                  </div>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div>
                      {this.state.filter && (
                        <div key={this.state.filter._id}>
                          <div className={`${Styles.desc}`}>
                            <Tabs
                              defaultActiveKey="company"
                              id="uncontrolled-tab-example"
                              className="mt-2"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Tab
                                eventKey="company"
                                title="Company"
                                className="m-0 p-0"
                              >
                                {this.state.companie && (
                                  <>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        margin: 0,
                                        padding: 0,
                                      }}
                                      className={`${Styles.example}`}
                                    >
                                      <Col
                                        xs={12}
                                        md={12}
                                        sm={5}
                                        lg={5}
                                        className={` e-card e-card-horizontal mt-4`}
                                        style={{
                                          height: "auto",
                                        }}
                                      >
                                        <Row>
                                          <Col
                                            xs={12}
                                            md={12}
                                            sm={12}
                                            lg={12}
                                            className={`${Styles.imgCol}`}
                                          >
                                            {this.state.companie.image ? (
                                              <img
                                                className={`${Styles.img}  mt-1 mb-1`}
                                                src={this.state.companie.image}
                                                alt="Sample"
                                              />
                                            ) : (
                                              <img
                                                src="https://www.flaticon.com/svg/static/icons/svg/52/52782.svg"
                                                alt="Sample"
                                                className={`${Styles.img}  mt-1 mb-1`}
                                              />
                                            )}
                                          </Col>
                                          <Col xs={12} md={12} sm={12} lg={12}>
                                            <div
                                              style={{
                                                // width: "300px",
                                                textAlign: "left",
                                              }}
                                            >
                                              <div>
                                                <h5
                                                  className={`${Styles.jobPosition} ml-3`}
                                                >
                                                  {
                                                    this.state.companie
                                                      .companyName
                                                  }
                                                </h5>
                                              </div>

                                              <div>
                                                <div>
                                                  <a
                                                    href={
                                                      this.state.companie
                                                        .website
                                                    }
                                                    target="_blank"
                                                  >
                                                    <h6 className="ml-3">
                                                      {
                                                        this.state.companie
                                                          .website
                                                      }
                                                    </h6>
                                                  </a>
                                                </div>

                                                <div>
                                                  <h6
                                                    className={`${Styles.headTitle} ml-3`}
                                                  >
                                                    {
                                                      this.state.companie
                                                        .location
                                                    }
                                                  </h6>
                                                </div>
                                                <div>
                                                  <h6
                                                    className={`${Styles.headTitle} ml-3`}
                                                  >
                                                    {this.state.companie.email}
                                                  </h6>
                                                </div>
                                                <div>
                                                  <h6
                                                    className={`${Styles.headTitle} ml-3`}
                                                  >
                                                    {
                                                      this.state.companie
                                                        .personel
                                                    }
                                                    -Hired
                                                  </h6>
                                                </div>
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col
                                        xs={12}
                                        md={12}
                                        sm={7}
                                        lg={7}
                                        className={`${Styles.about} mt-4`}
                                      >
                                        {" "}
                                        <p className={`${Styles.paragraphs}`}>
                                          {this.state.companie.aboutMe}
                                        </p>
                                      </Col>
                                    </Row>
                                  </>
                                )}
                              </Tab>
                              <Tab
                                eventKey="jobDescription"
                                title="Job Description"
                              >
                                <div className={`${Styles.about} mt-4`}>
                                  {this.state.filter.jobDescription ? (
                                    <p className={`${Styles.paragraphs}`}>
                                      {this.state.filter.jobDescription}
                                    </p>
                                  ) : (
                                    <p className={`${Styles.paragraphs}`}>
                                      No Job Description
                                    </p>
                                  )}
                                </div>
                              </Tab>
                              <Tab
                                eventKey="requirments"
                                title="Job Requirments"
                              >
                                <div className={`${Styles.about} mt-4`}>
                                  {this.state.filter.requirments ? (
                                    <p className={`${Styles.paragraphs}`}>
                                      {this.state.filter.requirments}
                                    </p>
                                  ) : (
                                    <p className={`${Styles.paragraphs}`}>
                                      No requirments
                                    </p>
                                  )}
                                </div>
                              </Tab>
                              <Tab eventKey="benefites" title="Job Benefites">
                                <div className={`${Styles.about} mt-4`}>
                                  {" "}
                                  {this.state.filter.benefites ? (
                                    <p className={`${Styles.paragraphs}`}>
                                      {this.state.filter.benefites}
                                    </p>
                                  ) : (
                                    <p className={`${Styles.paragraphs}`}>
                                      No Benefites
                                    </p>
                                  )}
                                </div>
                              </Tab>
                            </Tabs>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
        <Modal
          className={`${Styles.modal}`}
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Job Applying</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are You Really Ready To Apply For{" "}
            {this.state.filter &&
              this.state.filter.jobPosition &&
              this.state.filter.jobPosition}
            ?
          </Modal.Body>
          <Modal.Body>
            To Have More Chances To Win The Job Please Check Your Profile If You
            Need To Add Something{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={this.closeModal}
            >
              Close
            </Button>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={() => {
                this.aplyForJob();
                this.closeModal();
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default connect(mapStateToProps)(Inside);
