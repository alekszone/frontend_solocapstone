import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdWeb } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import About from "./About";
import Style from "./Styles.module.css";
import Loader from "../Loader/Loader";
import Styles from "./Styles.module.css";
export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [hideProfile, setHideProfile] = useState(true);
  const [hideEdit, setHideEdit] = useState(false);
  const [hideIcon, setHideIcon] = useState(true);
  const [name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [position, setPosition] = useState("");
  const [loader, setloader] = useState(true);
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const result = await fetch(url + "/profile/profile", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data = await result.json();
      setProfile(data);
      console.log(" helllloooo", data);
      setName(data.name);
      setlocation(data.location);
      setSurname(data.surname);
      setPosition(data.position);
      setEmail(data.email);
      setAboutMe(data.aboutMe);
      setDateOfBirth(data.dateOfBirth.slice(0, 10));
      setPortfolioLink(data.portolioLink);
      setTimeout(() => {
        setloader(false);
      }, 1200);
    }
  };
  const data = {
    name,
    location,
    surname,
    email,
    aboutMe,
    dateOfBirth,
    portfolioLink,
    position,
  };

  const editProfile = async () => {
    const result = await fetch(url + "/profile/edit", {
      method: "PUT",

      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      fetchProfile();
      showEdit();
    }
  };
  console.log(profile);

  const hideData = async () => {
    if (hideProfile === true) {
      setHideProfile(false);
      setHideEdit(true);
      setHideIcon(false);
    }
  };
  const showEdit = async () => {
    if (hideProfile === false) {
      setHideProfile(true);
      setHideEdit(false);
      setHideIcon(true);
    }
  };
  const handleUpload = async (e) => {
    const uploadImage = e.target.files[0];
    const image = new FormData();
    image.append("image", uploadImage);
    const uploadPhoto = await fetch(url + "/profile/uploadImage", {
      method: "POST",
      body: image,

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,

        "Access-Control-Allow-Origin": "*",
      },
    });

    if (uploadPhoto.ok) {
      fetchProfile();
    } else {
      console.log("uploadd photo is not working");
    }
  };

  return (
    <Row className="m-0 p-0">
      {loader ? (
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Loader />
        </Col>
      ) : (
        <>
          {profile && (
            <>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={`${Styles.profile} mt-4`}
              >
                <div
                  className={`${Styles.header} `}
                  style={{ height: "200px" }}
                >
                  <div
                    className="mt-3 ml-5 "
                    style={{ height: "150px", display: "flex" }}
                  >
                    {profile.image ? (
                      <>
                        <img
                          src={profile.image}
                          className={`${Styles.imgProfile}`}
                        />

                        <label
                          htmlFor="file-input"
                          aria-required="true"
                          className={`${Style.uploadPhoto}`}
                        >
                          <AiOutlineEdit
                            className={`${Style.icon}`}
                            style={{
                              marginLeft: "auto",
                              fontSize: "35px",
                              color: "orangered",
                              backgroundColor: "white",
                            }}
                          />
                        </label>
                        <input
                          className={`${Style.input}`}
                          key="image"
                          id="file-input"
                          type="file"
                          accept="image/*"
                          profile="file"
                          onChange={(e) => handleUpload(e)}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className={`${Style.imgProfile}`}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-Tom5eAUi7AaarN_g-WIkVxvRNhdHa8BrQ&usqp=CAU"
                        />

                        <label
                          htmlFor="file-input"
                          aria-required="true"
                          className={`${Style.uploadPhoto}`}
                        >
                          <AiOutlineEdit
                            className={`${Style.icon}`}
                            style={{
                              marginLeft: "auto",
                              fontSize: "35px",
                              color: "orangered",
                              backgroundColor: "white",
                            }}
                          />
                        </label>
                        <input
                          className={`${Style.input}`}
                          key="image"
                          id="file-input"
                          type="file"
                          accept="image/*"
                          profile="file"
                          // value={this.state.image}
                          onChange={(e) => handleUpload(e)}
                        />
                        {/* </div> */}
                      </>
                    )}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={`${Styles.div}`}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={4}>
                      {hideProfile && (
                        <>
                          <div className={`${Style.dataInfo} mt-1`}>
                            <div>
                              <h5 className="mt-2">Personal Info</h5>
                              {hideIcon && (
                                <AiOutlineEdit
                                  onClick={hideData}
                                  className="mt-1"
                                  style={{
                                    marginLeft: "auto",
                                    fontSize: "25px",
                                    color: "orangered",
                                  }}
                                />
                              )}
                            </div>
                            <div>
                              <FaUserAlt />

                              {profile.name ? (
                                <h6>
                                  {profile.name}- {profile.surname}
                                </h6>
                              ) : (
                                <h6> Name Empty</h6>
                              )}
                            </div>
                            <div>
                              <AiOutlineMail />

                              {profile.email ? (
                                <h6>{profile.email}</h6>
                              ) : (
                                <h6>Email Empty</h6>
                              )}
                            </div>
                            <div>
                              <GoLocation />
                              {profile.location ? (
                                <h6>{profile.location}</h6>
                              ) : (
                                <h6>No Location</h6>
                              )}
                            </div>
                            <div>
                              <MdWeb />
                              {profile.portfolioLink ? (
                                <h6>{profile.portfolioLink}</h6>
                              ) : (
                                <h6>No Portofolio Link</h6>
                              )}
                            </div>
                            <div>
                              <GrUserWorker />

                              {profile.position ? (
                                <h6>{profile.position}</h6>
                              ) : (
                                <h6>No Info</h6>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {hideEdit && (
                        <>
                          <div className={`${Style.dataInfo} `}>
                            <div>
                              <h5 className="mt-2">Edit Info</h5>
                            </div>

                            <div>
                              <FaUserAlt />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "40%",
                                  marginLeft: "10px",
                                }}
                                value={surname}
                                onChange={(e) =>
                                  setSurname(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "40%",
                                  marginLeft: "10px",
                                }}
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <AiOutlineMail />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                aria-label="Small"
                                value={email}
                                onChange={(e) =>
                                  setEmail(e.currentTarget.value)
                                }
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <GoLocation />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={location}
                                onChange={(e) =>
                                  setlocation(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <MdWeb />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={portfolioLink}
                                onChange={(e) =>
                                  setPortfolioLink(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <GrUserWorker />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={position}
                                onChange={(e) =>
                                  setPosition(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>

                            <div>
                              <Button
                                style={{ marginLeft: "auto" }}
                                variant="light"
                                className={`${Style.btngrad} mr-2`}
                                onClick={() => editProfile()}
                              >
                                Save
                              </Button>
                              <Button
                                variant="light"
                                className={`${Style.btngrad}`}
                                onClick={showEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={8}>
                      <div className={`${Style.dataAbout} `}>
                        <About />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </>
          )}
        </>
      )}
    </Row>
  );
}
