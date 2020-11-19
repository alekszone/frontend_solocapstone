import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { withRouter, Link } from "react-router-dom";
import Styles from "./Styles.module.css";
function AllPost(props) {
  const url = process.env.REACT_APP_URL;
  const [companyProfile, setcompanyProfile] = useState([]);
  useEffect(() => {
    company();
  }, []);

  const company = async () => {
    const data = await fetch(url + "/login/profile", {
      method: "GET",
      
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
    });
    const Post = await data.json();
    if (Post) {
      setcompanyProfile(Post);
      console.log(Post, "why is empty");
    } else {
      console.log("there is no data ");
    }
  };
  const sendTo = () => {
    props.history.push("/companyPosts");
  };

  return (
    <div
      style={{
        boxShadow: "3px 3px 3px rgb(148, 148, 148)",
        transition: "0.5s",
        backgroundColor: "rgb(255, 255, 255)",
      }}
      className={`${Styles.next} ${Styles.dropDown}  `}
    >
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        style={{
          backgroundColor: "white",
          zIndex: "10",
          position: "-webkit-sticky",
          position: "sticky",
          top: "0",
          height: "150px",
        }}
        className="mt-2"
      >
        <div
          className={`${Styles.cartblock1} mt-2`}
          style={{
            // display: "flex",
            // justifyContent: "space-around",
            height: "80%",
          }}
        >
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              {companyProfile[0] && companyProfile[0].image ? (
                <img
                  src={companyProfile[0].image}
                  className={` mt-3`}
                  style={{
                    borderRadius: "none !important",
                  }}
                />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-Tom5eAUi7AaarN_g-WIkVxvRNhdHa8BrQ&usqp=CAU"
                  className={` mt-3`}
                  style={{
                    borderRadius: "none !important",
                  }}
                />
              )}
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="mt-4">
                <h5 className={` text-left`}>
                  {companyProfile[0] && companyProfile[0].companyName}
                </h5>
                <h6 className={` text-left`}>
                  {companyProfile[0] && companyProfile[0].email}
                </h6>{" "}
                <h6 className={` text-left`}>
                  {companyProfile[0] && companyProfile[0].location}
                </h6>
              </div>
            </Col>
          </Row>
        </div>
      </Col>

      <Col xs={12} sm={12} md={12} lg={12}>
        <Table className={`${Styles.custab}  pl-2 pr-2`}>
          <Thead>
            <Tr className="text-center">
              <Th>Position</Th>
              <Th>Application</Th>
              <Th>Created</Th>
              <Th>Salary</Th>
            </Tr>
          </Thead>

          {props.allJob &&
            props.allJob.map((data, i) => {
              return (
                <>
                  <Tbody>
                    <Tr
                      className={`${Styles.custab} text-center`}
                      onClick={() => {
                        props.getPosts(data.allAplication, data._id);
                        props.hideButton();
                      }}
                    >
                      <Td>{data.jobPosition}</Td>
                      <Td style={{ textAlign: "center" }}>
                        {data.allAplication.length}
                      </Td>
                      <Td>{data.createdAt.slice(0, 10)}</Td>
                      <Td>{data.salary}</Td>
                    </Tr>
                  </Tbody>
                </>
              );
            })}
        </Table>
        {props.allJob.length === 0 && (
          <>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <div className="mt-2" onClick={() => sendTo()}>
                <h6>You have no Post.Add A Post. </h6>
                <img
                  className="mt-0"
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            </Col>
          </>
        )}
      </Col>
    </div>
  );
}

export default withRouter(AllPost);
