import React from "react";
import Styles from "./Styles.module.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
export default function Education(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Education History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.education &&
            props.education.length > 0 &&
            props.education.map((data) => {
              return (
                <>
                  {" "}
                  <Row
                    className={` ${Styles.aboutme2}  justify-content-space-bettwen text-left m-0 p-0 mt-3`}
                  >
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Row>
                        <Col
                          xs={5}
                          sm={5}
                          md={5}
                          lg={5}
                          className="text-center"
                        >
                          <div>
                            {data.image ? (
                              <img
                                src={data.image}
                                className={`${Styles.images} mt-1 `}
                                style={{ borderRadius: 0 }}
                              />
                            ) : (
                              <img
                                src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                                className={`${Styles.images} mt-1  `}
                                style={{ borderRadius: 0 }}
                              />
                            )}
                          </div>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={7}>
                          <div
                            style={{
                              display: "flex",
                              textAlign: "left",
                              flexDirection: "column",
                            }}
                            className="mt-1"
                          >
                            <h5>{data.schoolName}</h5>
                            <p>
                              <i>
                                {data.startDate}-{data.endDate}{" "}
                              </i>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      style={{ height: "auto" }}
                    >
                      <div style={{ textAlign: "left" }} className="mt-3">
                        <div>
                          <h5>About </h5>
                          <p>{data.about}</p>
                        </div>
                        <div>
                          <h5>Skill Learned</h5>
                          <p>{data.skillsLearned}</p>
                        </div>
                      </div>
                    </Col>{" "}
                  </Row>
                </>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            style={{ border: 0 }}
            className={`${Styles.btngrad}`}
            onClick={props.handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
