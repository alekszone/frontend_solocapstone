import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { RiImageAddFill } from 'react-icons/ri';
import Styles from './Style.module.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function AddPost(props) {
  const [jobPosition, setjobPosition] = useState('');
  const [salary, setsalary] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [type, settype] = useState('');
  const [imagePost, setImage] = useState('');
  const [requirments, setRequirments] = useState([]);
  const [benefites, setBenefites] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [show, setShow] = useState(false);
  const url = process.env.REACT_APP_URL;

  const handleClose = () => {
    setShow(false);
    setshowButton(true);
  };
  const handleShow = () => {
    setshowButton(false);

    setShow(true);
  };

  const newPost = {
    jobPosition,
    salary,
    jobDescription,
    requirments,
    benefites,
    type,
  };

  const AddNewPost = async () => {
    const result = await fetch(url + '/post/newPost', {
      method: 'POST',

      body: JSON.stringify(newPost),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await result.json();
    if (data) {
      console.log(data);

      const uploadImage = imagePost;
      const image = new FormData();
      image.append('image', uploadImage);
      const uploadPhoto = await fetch(url + '/post/uploadImage/' + data._id, {
        method: 'POST',
        body: image,

        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

          'Access-Control-Allow-Origin': '*',
        },
      });

      if (uploadPhoto.ok) {
        console.log('uploaded');
        props.fetchPost();
        handleClose();
        console.log('uploadd photo is not working');
      } else {
        console.log('uploadd photo is not working');
      }
      props.fetchPost();
      handleClose();
    }
  };

  return (
    <>
      <Row>
        <Col
          className='text-center  mt-2 mb-2'
          style={{ alignItems: 'center' }}
        >
          {showButton && (
            <Button
              variant='light'
              className={`${Styles.btngrad}`}
              onClick={() => {
                handleShow();
              }}
            >
              Add New Post
            </Button>
          )}

          <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
            className='mt-0'
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Post</Modal.Title>
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
                    <h6>Add Job Position</h6>

                    <form>
                      <TextField
                        id='filled-multiline-flexible'
                        label='Position'
                        className='mb-2'
                        type='text'
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        type='text'
                        value={jobPosition}
                        onChange={(e) => {
                          setjobPosition(e.currentTarget.value);
                        }}
                      />
                    </form>
                  </div>
                  <div>
                    <h6>Add Job Salary </h6>
                    <form>
                      <TextField
                        id='filled-multiline-flexible'
                        label='Salary'
                        className='mb-2'
                        type='text'
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        type='text'
                        value={salary}
                        onChange={(e) => {
                          setsalary(e.currentTarget.value);
                        }}
                      />
                    </form>
                  </div>
                  <div>
                    {' '}
                    <h6> Job Type </h6>
                    {/* <Form.Group controlId="exampleForm.ControlSelect1"> */}
                    <FormControl
                      variant='outlined'
                      style={{
                        width: '100%',
                      }}
                      className='mb-2'
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Job Type
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Job Type'
                        onChange={(e) => {
                          settype(e.target.value);
                        }}
                      >
                        <MenuItem value=''>
                          <em>Type</em>
                        </MenuItem>
                        <MenuItem value={'Full Time'}>Full Time</MenuItem>
                        <MenuItem value={'Part Time'}>Part Time</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <div>
                      <h6>Add Position Responsibilities </h6>

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
                          value={jobDescription}
                          onChange={(e) => {
                            setjobDescription(e.currentTarget.value);
                          }}
                        />
                      </form>
                    </div>
                    <div>
                      <h6>Add Job Requirments </h6>
                      <form>
                        <TextField
                          id='outlined-multiline-static'
                          label='Requirments'
                          multiline
                          className='mb-2'
                          rows={4}
                          style={{
                            width: '100%',
                          }}
                          variant='outlined'
                          value={requirments}
                          onChange={(e) => {
                            setRequirments(e.currentTarget.value);
                          }}
                        />
                      </form>
                    </div>
                    <div>
                      <h6>Add Job Benefites </h6>

                      <form>
                        <TextField
                          id='outlined-multiline-static'
                          label='Benefites'
                          multiline
                          className='mb-2'
                          rows={4}
                          style={{
                            width: '100%',
                          }}
                          variant='outlined'
                          value={benefites}
                          onChange={(e) => {
                            setBenefites(e.currentTarget.value);
                          }}
                        />
                      </form>
                    </div>
                    <h6 className='mt-2 mb-2'>Upload Image</h6>
                    <label
                      htmlFor='file-input'
                      aria-required='true'
                      //   className={`${Style.uploadPhoto}`}
                    >
                      <RiImageAddFill
                        style={{ width: '50px', height: '50px' }}
                      />
                    </label>
                    <input
                      style={{ display: 'none' }}
                      key='image'
                      id='file-input'
                      type='file'
                      accept='image/*'
                      profile='file'
                      // value={this.state.image}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='light'
                className={`${Styles.btngrad}`}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant='light'
                className={`${Styles.btngrad}`}
                onClick={() => AddNewPost()}
              >
                Post
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </>
  );
}
