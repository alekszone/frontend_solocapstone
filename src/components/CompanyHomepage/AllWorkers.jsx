import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AllPost from "./AllPost";

import Pagination from "./Pagination";
import Carts from "./Carts";
import WorkerProfile from "./WorkerProfile";
import Styles from "./Styles.module.css";
import Loader from "../Loader/Loader";

export default function AllWorkers() {
  const url = process.env.REACT_APP_URL;
  const [allJob, setAllJob] = useState([]);
  const [profile, setProfile] = useState("");
  const [aplicant, setaplicant] = useState([]);
  const [buttons, setButtons] = useState(false);
  const [Id, setId] = useState("");
  const [loader, setloader] = useState(true);

  const showButton = () => {
    setButtons(true);
  };
  const hideButton = () => {
    setButtons(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(3);

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = aplicant.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    allPost();
  }, []);

  const allPost = async () => {
    const data = await fetch(url + "/post/allPosts", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const allPost = await data.json();
    if (allPost) {
      setTimeout(() => {
        setloader(false);
      }, 2000);

      setAllJob(allPost);
    } else {
      console.log("there is no data ");
      setTimeout(() => {
        setloader(false);
      }, 2000);
    }
  };

  const getPosts = (allAplication, id) => {
    const data = allAplication;
    setaplicant(data);
    setProfile([]);
    setId(id);
  };
  const allPosts = async () => {
    const data = await fetch(url + "/post/singelPost/" + Id, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const allPost = await data.json();
    if (allPost) {
      setaplicant(allPost.allAplication);
    } else {
      console.log("there is no data ");
    }
  };

  return (
    <>
      <Row className={`${Styles.company}`}>
        {loader ? (
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ dispaly: "flex", justifyContent: "center" }}
          >
            <Loader
            // className={`ml-5 mt-5 `}
            />
          </Col>
        ) : (
          <>
            <Col xs={12} sm={12} md={5} lg={5} className="mt-3">
              <AllPost
                getPosts={getPosts}
                allJob={allJob}
                hideButton={hideButton}
              />
            </Col>
            <Col
              xs={12}
              sm={12}
              md={7}
              lg={7}
              className={` ${Styles.aplication}  mt-3  ${Styles.userProfile}`}
            >
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Carts
                    currentAplicant={currentAplicant}
                    setProfile={setProfile}
                    showButton={showButton}
                  />{" "}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className="mt-1 ">
                  <Pagination
                    aplicantPerPage={aplicantPerPage}
                    totalAplicant={aplicant.length}
                    paginate={paginate}
                  />
                </Col>

                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={`${Styles.dropDown123}`}
                >
                  <WorkerProfile
                    profile={profile}
                    id={Id}
                    allPost={allPost}
                    allPosts={allPosts}
                  />
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
