import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Styles from "./Styles.module.css";
export default function AllPost(props) {
  const [companyProfile, setcompanyProfile] = useState([]);
  useEffect(() => {
    company();
  }, []);

  const company = async () => {
    const data = await fetch("http://localhost:4006/login/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
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

  return (
    <div
      style={{
        boxShadow: "7px 7px 7px rgb(148, 148, 148)",
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
      >
        <div
          className={`${Styles.cartblock1} mt-2`}
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "80%",
          }}
        >
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
          <div className="mt-4">
            <h6>{companyProfile[0] && companyProfile[0].companyName}</h6>
            <h6>{companyProfile[0] && companyProfile[0].email}</h6>{" "}
            <h6>{companyProfile[0] && companyProfile[0].location}</h6>
          </div>
        </div>
      </Col>

      <Col xs={12} sm={12} md={12} lg={12}>
        <Table className={`${Styles.custab}  pl-2 pr-2`}>
          <Thead>
            <Tr>
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
                      className={`${Styles.custab} `}
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
      </Col>
    </div>
  );
}
