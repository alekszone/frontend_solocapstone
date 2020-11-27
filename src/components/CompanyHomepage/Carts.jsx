import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Styles from "./Styles.module.css";

import { FaRegFilePdf } from "react-icons/fa";

export default function Carts(props) {
  const url = process.env.REACT_APP_URL;
  const getPDF = async (data) => {
    fetch(url + `/login/${data._id}/pdf`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (user) {
        var blob = new Blob([user]);
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.setAttribute("href", url);
        anchor.setAttribute("download", `${data.name}CV.pdf`);
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <>
      {props.currentAplicant &&
        props.currentAplicant.map((data) => {
          return (
            <>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                className={`${Styles.users} ${Styles.cartblock} mt-2`}
              >
                {data.image ? (
                  <img
                    src={data.image}
                    className="img-responsive mt-1 "
                    alt=""
                    onClick={() => {
                      props.setProfile(data._id);

                      props.showButton();
                    }}
                  />
                ) : (
                  <img
                    src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png"
                    className="img-responsive mt-1 "
                    alt=""
                    onClick={() => {
                      props.setProfile(data._id);

                      props.showButton();
                    }}
                  />
                )}
                <h3
                  onClick={() => {
                    props.setProfile(data._id);

                    props.showButton();
                  }}
                >
                  {data.name} {data.surname}
                </h3>
                <h6>{data.position}</h6>

                <FaRegFilePdf
                  onClick={() => {
                    getPDF(data);
                  }}
                  className={`${Styles.pdf}`}
                />
              </Col>
            </>
          );
        })}
      {props.currentAplicant.length === 0 && (
        <>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <div>
              <h6 className="mt-2">Select Post To show Aplicants </h6>
              <img
                className="mt-1"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQB7MbKExx-gXWGSlkmjXpGnbOgDUm8dTWPw&usqp=CAU"
                style={{ width: "180px", height: "180px" }}
              />
            </div>
          </Col>
        </>
      )}
    </>
  );
}
