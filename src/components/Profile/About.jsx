import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import Style from "./Styles.module.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function About(props) {
  const [hide, setHide] = useState(false);
  const [about, setAbout] = useState(true);
  const [icon, setIcon] = useState(true);
  const [button, setButton] = useState(true);
  const [info, setInfo] = useState("");
  const [skip, setskip] = useState(false);
  const [getAbout, setGetAbout] = useState("");
  const [hideButton, sethideButton] = useState(true);
  const [showButton, setshowButton] = useState(false);
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    fetchProfile();
  }, []);

  const hideText = () => {
    if (about === true) {
      setHide(true);
      setAbout(false);
      setIcon(false);
    }
  };
  const showText = () => {
    if (about === false) {
      setHide(false);
      setAbout(true);
      setIcon(true);
    }
  };
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
      console.log(data.aboutMe, "ca ka mrena");
      setGetAbout(data.aboutMe);
      setInfo(data.aboutMe, "...");
      if (data.aboutMe.length > 580) {
        setButton(true);
      }
    }
  };
  const data = () => {
    if (skip == true) {
      setInfo(getAbout.slice(0, 580));
      setskip(false);
      sethideButton(true);
      setshowButton(false);
    } else if (skip == false) {
      setInfo(getAbout);
      setskip(true);
      sethideButton(false);
      setshowButton(true);
    }
  };
  const editProfile = async () => {
    const result = await fetch(url + "/profile/edit", {
      method: "PUT",

      body: JSON.stringify({ aboutMe: getAbout }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (result) {
      fetchProfile();
      showText();
    }
  };

  return (
    <>
      {about && (
        <>
          <div>
            <h5 className={`${Style.titleAbout} mt-2`}>About Me</h5>
            {icon && (
              <AiOutlineEdit
                onClick={hideText}
                className="mt-1"
                style={{
                  marginLeft: "auto",
                  fontSize: "25px",
                  color: "orangered",
                }}
              />
            )}
          </div>
          {button && (
            <>
              {hideButton && (
                <>
                  <div>
                    {info.length > 0 ? (
                      <p className={`${Style.aboutMe}`}> {info}</p>
                    ) : (
                      <p className={`${Style.aboutMe}`}>No Description</p>
                    )}
                  </div>
                  {/* // <div style={{ marginRight: 'auto' }}> */}

                  <div className="mt-2">
                    <Button
                      style={{ marginLeft: "auto", marginBottom: "3px" }}
                      className={`${Style.btngrad} mr-3`}
                      variant="light"
                      onClick={() => data()}
                    >
                      Show More
                    </Button>
                  </div>
                </>
              )}
              {showButton && (
                <>
                  <div>
                    <p className={`${Style.aboutMe2}`}>{info}</p>
                  </div>
                  <div className="mt-2">
                    <Button
                      style={{ marginLeft: "auto", marginBottom: "3px" }}
                      className={`${Style.btngrad} mr-3`}
                      variant="light"
                      onClick={() => data()}
                    >
                      Hide{" "}
                    </Button>
                  </div>
                </>
              )}
              {/* </div>    */}
            </>
          )}
        </>
      )}
      {hide && (
        <>
          <div>
            <h5 className={`${Style.titleAbout} mt-2`}>Edit About</h5>
          </div>{" "}
          <form style={{ width: "100%" }}>
            <TextField
              id="outlined-multiline-static"
              label="About Me"
              multiline
              rows={6}
              style={{
                width: "95%",
              }}
              variant="outlined"
              value={getAbout}
              onChange={(e) => setGetAbout(e.currentTarget.value)}
            />{" "}
          </form>
          <div>
            <Button
              style={{ marginLeft: "auto" }}
              variant="light"
              className={`${Style.btngrad} mr-2 mb-3`}
              onClick={() => editProfile()}
            >
              Save
            </Button>
            <Button
              variant="light"
              className={`${Style.btngrad} mb-3`}
              onClick={showText}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </>
  );
}
