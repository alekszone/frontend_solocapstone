import React, { useState } from "react";
import Styles from "./Styles.module.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
export default function Workexperience(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Work experiences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            className={`${Styles.aboutme} justify-content-space-bettwen text-left m-0 p-0 `}
          >
            {props.workExperience &&
              props.workExperience.length > 0 &&
              props.workExperience.map((data) => {
                return (
                  <>
                    <Col xs={4} sm={4} md={4} lg={4}>
                      {data.image ? (
                        <img
                          src={data.image}
                          className={`${Styles.images} mt-5 ml-2`}
                          style={{ borderRadius: 0 }}
                        />
                      ) : (
                        <img
                          src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                          className={`${Styles.images} mt-5  ml-2`}
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
                        <h5>{data.workExperience && data.workExperience}</h5>
                        <p className="ml-5 ">
                          <i>
                            {data.started} -{data.finished}{" "}
                          </i>
                        </p>
                      </div>

                      <p>{data.workPosition}</p>
                      <p>{data.description}</p>
                    </Col>
                  </>
                );
              })}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}