import React, { Component } from 'react';
import { Modal, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { BiUpload } from 'react-icons/bi';
import { RiImageAddFill } from 'react-icons/ri';
import { RiDeleteBinLine } from 'react-icons/ri';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AiOutlineEdit } from 'react-icons/ai';
import Styles from './Styles.module.css';
const url = process.env.REACT_APP_URL;
export default class Education extends Component {
  state = {
    education: [],
    postEducation: {
      schoolName: '',
      about: '',
      startDate: '',
      endDate: '',
      skillsLearned: '',
    },
    image: '',
    postId: '',
    editShow: false,
    show: false,
    postData: [],
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => {
    this.setState({ show: true });
    this.setState({
      postEducation: {
        ...this.state.postEducation,

        schoolName: '',
        about: '',
        startDate: '',
        endDate: '',
        skillsLearned: '',
      },
    });
  };

  editClose = () => this.setState({ editShow: false });
  editShow = (data) => {
    this.setState({ editShow: true });

    this.setState({
      postEducation: {
        ...this.state.postEducation,
        schoolName: data.schoolName,
        about: data.about,
        startDate: data.startedDate,
        endDate: data.endDate,
        skillsLearned: data.skillsLearned,
      },
    });
    this.setState({ postId: data._id });
  };

  componentDidMount = async () => {
    this.fetchData();
  };
  fetchData = async () => {
    const getEducation = await fetch(url + `/education/allEducation`, {
      method: 'GET',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await getEducation.json();
    this.setState({ education: data });
    console.log(data, 'where are the data');
  };

  postEducation = async () => {
    const getEducation = await fetch(url + `/education/postEducation`, {
      method: 'POST',

      body: JSON.stringify(this.state.postEducation),
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    });

    const id = await getEducation.json();
    console.log(id, 'what have inside');
    if (id) {
      const image = new FormData();
      image.append('image', this.state.image);
      const uploadPhoto = await fetch(url + `/education/uploadImage/` + id, {
        method: 'POST',

        body: image,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

          'Access-Control-Allow-Origin': '*',
        },
      });

      if (uploadPhoto.ok) {
        const data = await uploadPhoto.json();
        console.log(data, 'education  ');
        this.setState({ education: [...this.state.education, data] });
      }
      this.handleClose();
      this.setState({ image: '' });
      this.setState({
        postEducation: {
          ...this.state.postEducation,

          schoolName: '',
          about: '',
          startDate: '',
          endDate: '',
          skillsLearned: '',
        },
      });
    } else {
      console.log('the answer is empty');
    }
  };

  editEducation = async () => {
    console.log(this.state.postId, 'kosdvsdojmsdm');
    console.log(this.state.ex, 'kosdvsdojmsdm');
    const getEducation = await fetch(
      url + `/education/edit/` + this.state.postId,
      {
        method: 'PUT',

        body: JSON.stringify({ ...this.state.postEducation }),
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await getEducation.json();
    if (data) {
      console.log(data, 'what edit brings');
      const image = new FormData();
      console.log(this.state.image, 'image');
      image.append('image', this.state.image);
      const uploadPhoto = await fetch(
        url + `/education/uploadImage/` + data._id,
        {
          method: 'POST',

          body: image,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,

            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (uploadPhoto.ok) {
        console.log('imazhi u shtua');
      }
      this.fetchData();
      this.setState({ image: '' });
      this.setState({
        postEducation: {
          ...this.state.postEducation,

          schoolName: '',
          about: '',
          startDate: '',
          endDate: '',
          skillsLearned: '',
        },
      });
      this.editClose();
    }
    this.fetchData();
  };

  deleteEducation = async (id) => {
    const getEducation = await fetch(url + `/education/delete/` + id, {
      method: 'DELETE',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (getEducation.ok) {
      console.log('is deleted');
      //   this.state.experiences();
      this.fetchData();
    }
  };

  render() {
    console.log(this.state.image, 'ca ka mrena');
    return (
      <>
        <Row className={`${Styles.myPosts}`}>
          <Col xs={12} sm={12} md={12} lg={12} className='text-right '>
            <Button
              style={{
                fontSize: '15px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
              variant='light'
              className={`${Styles.btngrad}`}
              onClick={this.handleShow}
            >
              Add Education
            </Button>
          </Col>

          {this.state.education && this.state.education.length > 0 ? (
            <>
              {this.state.education &&
                this.state.education.map((data) => {
                  return (
                    <>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <div className={`${Styles.carts} mt-3`}>
                          <Row
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                              boxShadow:
                                '0px 0px 3px  rgba(212, 212, 212, 0.938)',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                          >
                            <Col
                              xs={4}
                              sm={4}
                              md={4}
                              lg={4}
                              style={{ height: '125px' }}
                            >
                              {data.image ? (
                                <img
                                  src={data.image}
                                  style={{
                                    width: '90%',
                                    height: '85%',
                                    // objectFit: "cover",
                                    borderRadius: '5px',
                                  }}
                                  className='mt-2'  
                                />
                              ) : (
                                <img
                                  src='https://ianmartin.com/wp-content/uploads/2017/10/WhatE28099s20the20Best20Day20of20the20Week20to20Post20a20Job20Ad-1030x687.jpg'
                                  style={{
                                    width: '90%',
                                    height: '85%',
                                    // objectFit: "cover",
                                    borderRadius: '5px',
                                  }}
                                  className='mt-2' 
                                />
                              )}
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} className='mt-1'>
                              <h5 className={`${Styles.headTitle} mt-2 ml-2`}>
                                {data.schoolName}
                              </h5>

                              <h6 className={`${Styles.salary} ml-2`}>
                                {data.startDate}-{data.endDate}
                              </h6>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'right',
                                }}
                              >
                          
                                  <RiDeleteBinLine
                                    className={`${Styles.icon} mt-3`}  onClick={() =>
                                    this.deleteExperience(data._id)}
                                  />
                              
                          
                                  <AiOutlineEdit
                                    className={`${Styles.icon} mt-3`}
                                    onClick={() => this.editShow(data)}
                                  />
                            
                              </div>
                            </Col>
                          </Row>
                          <div className={`${Styles.aboutCarts} ml-1 mr-1`}>
                            <div>
                              {data.about ? (
                                <>
                                  <h6
                                    className={`${Styles.headTitle} ml-2 mt-2`}
                                  >
                                    Education Description
                                  </h6>
                                  <p className={`${Styles.aboutMe}`}>
                                    {data.about}
                                  </p>
                                </>
                              ) : (
                                <h6 className={`${Styles.headTitle} ml-2 mt-2`}>
                                  No Description Detail .{' '}
                                </h6>
                              )}
                            </div>
                            <div>
                              {data.skillsLearned ? (
                                <>
                                  <h6
                                    className={`${Styles.headTitle} ml-2 mt-2`}
                                  >
                                    Skills Learned
                                  </h6>
                                  <p className={`${Styles.aboutMe}`}>
                                    {data.skillsLearned}
                                  </p>
                                </>
                              ) : (
                                <h6 className={`${Styles.headTitle} ml-2 mt-2`}>
                                  No Skill Detail .{' '}
                                </h6>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}{' '}
            </>
          ) : (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ alignItems: 'center', textAlign: 'center' }}
            >
              <div className='mt-5'>
                <h6>You have no Experiences</h6>
                <img
                  className='mt-0'
                  src='https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png'
                  style={{ width: '250px', height: '250px' }}
                />
              </div>
            </Col>
          )}
        </Row>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Education</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={`${Styles.textStyle}`}
                style={{ textAlign: 'center' }}
              >
                <div>
                  <h6>School Name</h6>

                  <form>
                    <TextField
                      id='filled-multiline-flexible'
                      label='School Name'
                      className='mb-2'
                      type='text'
                      variant='outlined'
                      style={{
                        width: '100%',
                      }}
                      type='text'
                      value={this.state.postEducation.schoolName}
                      onChange={(e) =>
                        this.setState({
                          postEducation: {
                            ...this.state.postEducation,
                            schoolName: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
                <div>
                  <h6>Skill Learned </h6>
                  <form>
                    <TextField
                      id='filled-multiline-flexible'
                      label='Skill Learned'
                      className='mb-2'
                      type='text'
                      variant='outlined'
                      style={{
                        width: '100%',
                      }}
                      type='text'
                      value={this.state.postEducation.skillsLearned}
                      onChange={(e) =>
                        this.setState({
                          postEducation: {
                            ...this.state.postEducation,
                            skillsLearned: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <h6>Started </h6>
                    <form>
                      <TextField
                        id='filled-multiline-flexible'
                        label='Started'
                        className='mb-2'
                        type='text'
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        type='text'
                        value={this.state.postEducation.startDate}
                        onChange={(e) =>
                          this.setState({
                            postEducation: {
                              ...this.state.postEducation,
                              startDate: e.currentTarget.value,
                            },
                          })
                        }
                      />
                    </form>
                  </div>
                  <div>
                    <h6>Finished </h6>
                    <form>
                      <TextField
                        id='filled-multiline-flexible'
                        label='Finished'
                        className='mb-2'
                        type='text'
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        type='text'
                        value={this.state.postEducation.endDate}
                        onChange={(e) =>
                          this.setState({
                            postEducation: {
                              ...this.state.postEducation,
                              endDate: e.currentTarget.value,
                            },
                          })
                        }
                      />
                    </form>
                  </div>
                </div>

                <div>
                  <div>
                    <h6>About </h6>

                    <form>
                      <TextField
                        id='outlined-multiline-static'
                        label='Job Description'
                        multiline
                        className='mb-2'
                        rows={4}
                        style={{
                          width: '100%',
                        }}
                        variant='outlined'
                        value={this.state.postEducation.about}
                        onChange={(e) =>
                          this.setState({
                            postEducation: {
                              ...this.state.postEducation,
                              about: e.currentTarget.value,
                            },
                          })
                        }
                      />
                    </form>
                  </div>

                  <h6 className='mt-2 mb-2'>Upload Image</h6>
                  <label
                    htmlFor='file-input'
                    aria-required='true'
                    //   className={`${Style.uploadPhoto}`}
                  >
                    {/* <RiImageAddFill style={{ width: "50px", height: "50px" }} /> */}
                  </label>
                  <input
                    style={{ alignItems: 'center' }}
                    key='image'
                    id='file-input'
                    type='file'
                    accept='image/*'
                    profile='file'
                    // value={this.state.image}
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='light'
              className={`${Styles.btngrad}`}
              onClick={this.handleClose}
            >
              Close
            </Button>
            <Button
              variant='light'
              className={`${Styles.btngrad}`}
              onClick={() => {
                this.postEducation();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.editShow}
          onHide={this.editClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Eperience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={`${Styles.textStyle}`}
                style={{ textAlign: 'center' }}
              >
                <div>
                  <h6>School Name</h6>

                  <form>
                    <TextField
                      id='filled-multiline-flexible'
                      label='School Name'
                      className='mb-2'
                      type='text'
                      variant='outlined'
                      style={{
                        width: '100%',
                      }}
                      type='text'
                      value={this.state.postEducation.schoolName}
                      onChange={(e) =>
                        this.setState({
                          postEducation: {
                            ...this.state.postEducation,
                            schoolName: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
                <div>
                  <h6>Skill Learned </h6>
                  <form>
                    <TextField
                      id='filled-multiline-flexible'
                      label='Skill Learned'
                      className='mb-2'
                      type='text'
                      variant='outlined'
                      style={{
                        width: '100%',
                      }}
                      type='text'
                      value={this.state.postEducation.skillsLearned}
                      onChange={(e) =>
                        this.setState({
                          postEducation: {
                            ...this.state.postEducation,
                            skillsLearned: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </form>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <h6>Started </h6>
                    <form>
                      <TextField
                        id='filled-multiline-flexible'
                        label='Started'
                        className='mb-2'
                        type='text'
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        type='text'
                        value={this.state.postEducation.startDate}
                        onChange={(e) =>
                          this.setState({
                            postEducation: {
                              ...this.state.postEducation,
                              startDate: e.currentTarget.value,
                            },
                          })
                        }
                      />
                    </form>
                  </div>
                  <div>
                    <h6>Finished </h6>
                    <form>
                      <TextField
                        id='filled-multiline-flexible'
                        label='Finished'
                        className='mb-2'
                        type='text'
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        type='text'
                        value={this.state.postEducation.endDate}
                        onChange={(e) =>
                          this.setState({
                            postEducation: {
                              ...this.state.postEducation,
                              endDate: e.currentTarget.value,
                            },
                          })
                        }
                      />
                    </form>
                  </div>
                </div>

                <div>
                  <div>
                    <h6>About </h6>

                    <form>
                      <TextField
                        id='outlined-multiline-static'
                        label='Job Description'
                        multiline
                        className='mb-2'
                        rows={4}
                        style={{
                          width: '100%',
                        }}
                        variant='outlined'
                        value={this.state.postEducation.about}
                        onChange={(e) =>
                          this.setState({
                            postEducation: {
                              ...this.state.postEducation,
                              about: e.currentTarget.value,
                            },
                          })
                        }
                      />
                    </form>
                  </div>

                  <h6 className='mt-2 mb-2'>Upload Image</h6>
                  <label
                    htmlFor='file-input'
                    aria-required='true'
                    //   className={`${Style.uploadPhoto}`}
                  >
                    {/* <RiImageAddFill style={{ width: "50px", height: "50px" }} /> */}
                  </label>
                  <input
                    key='image'
                    id='file-input'
                    type='file'
                    accept='image/*'
                    profile='file'
                    // value={this.state.image}
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='light'
              className={`${Styles.btngrad}`}
              onClick={this.editClose}
            >
              Close
            </Button>
            <Button
              variant='light'
              className={`${Styles.btngrad}`}
              onClick={() => {
                this.editEducation();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
