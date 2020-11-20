import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Style from './Style.module.css';
import Pagination from './Pagination';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddPost from './AddPost';
import EditPost from './EditPost';

export default function Posts() {
  const [post, setPost] = useState([]);
  const [newPost, setnewPost] = useState([]);
  const [show1, setShow1] = useState(false);
  const [infos, setinfos] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(4);
  const url = process.env.REACT_APP_URL;

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (data) => {
    setShow1(true);
    setinfos(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    const result = await fetch(url + '/post/allPosts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (result.ok) {
      const data = await result.json();
      setPost(data);
      setnewPost(data);
    }
  };

  const deletePost = async (id) => {
    const result = await fetch(url + '/post/deletePost/' + id, {
      method: 'DELETE',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (result.ok) {
      fetchPost();
    }else{
      fetchPost();
    }
  };
  const filterPost = (e) => {
    console.log(e);
    const text = e;
    if (text) {
      const filterPost = post.filter((x) =>
        x.jobPosition.toLowerCase().includes(text.toLowerCase())
      );
      if (filterPost) {
        setPost(filterPost);
      }
    } else {
      setPost(newPost);
    }
  };
  console.log(infos);
  return (
    <>
      <Row className={`${Style.myPosts}`}>
        <Col xs={12} sm={12} md={12} lg={12}>
          {' '}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='mt-2'>
              <AddPost fetchPost={fetchPost} />
            </div>
            <div
              className='mt-2'
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <form>
                <TextField
                  id='filled-multiline-flexible'
                  label='Search by Job Position'
                  type='text'
                  variant='outlined'
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                  type='text'
                  onChange={(e) => filterPost(e.currentTarget.value)}
                />
              </form>{' '}
            </div>
          </div>
        </Col>

        {currentAplicant &&
          currentAplicant.map((data) => {
            return (
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className={`${Style.carts} mt-3`}>
                  <Row
                    style={{
                      boxShadow: '3px 3px 3px  rgba(212, 212, 212, 0.938)',

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
                            height: '90%',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                          className='mt-2'
                        />
                      ) : (
                        <img
                          className='mt-1'
                          src='https://ianmartin.com/wp-content/uploads/2017/10/WhatE28099s20the20Best20Day20of20the20Week20to20Post20a20Job20Ad-1030x687.jpg'
                          style={{
                            width: '100%',
                            height: '93%',
                            objectFit: 'cover',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className='mt-1'>
                      <h5 className={`${Style.headTitle} mt-2 ml-2`}>
                        {data.companyName}
                      </h5>
                      <h5 className={`${Style.jobPosition} ml-2`}>
                        {data.jobPosition}
                      </h5>
                      <h6 className={`${Style.salary} ml-2`}>{data.salary}</h6>
                      <h6 className={`${Style.salary} ml-2`}>{data.type}</h6>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'right',
                        }}
                      >
                      
                          {' '}
                          <AiOutlineEdit className={`${Style.icon} mt-3`} onClick={() => {
                            handleShow1(data._id);
                          }} />
                     
                      
                          <RiDeleteBinLine className={`${Style.icon} mt-4 `} onClick={() => deletePost(data._id)} />
                       
                      </div>
                    </Col>
                    {/* </div> */}
                  </Row>
                  <div className={`${Style.about} ml-2 mr-2 mt-2 mb-5`}>
                    <div>
                      <h5 className={`${Style.headTitle} ml-2 mt-2`}>
                        {' '}
                        Job Description
                      </h5>
                      {data.jobDescription ? (
                        <p className={`${Style.paragraphs} `}>
                          {data.jobDescription}
                        </p>
                      ) : (
                        <p className={`mt-3`}>No Description Detail </p>
                      )}
                    </div>
                    <div>
                      <h5 className={`${Style.headTitle} ml-2 `}>
                        Job Requirments
                      </h5>
                      {data.requirments ? (
                        <p className={`${Style.paragraphs}`}>
                          {data.requirments}
                        </p>
                      ) : (
                        <p className={`mt-3 `}>No Requirments Detail </p>
                      )}
                    </div>
                    <div className='mb-2'>
                      <h5 className={`${Style.headTitle} ml-2 `}>
                        Job Benefites
                      </h5>
                      {data.benefites ? (
                        <p className={`${Style.paragraphs}`}>
                          {data.benefites}
                        </p>
                      ) : (
                        <p className={`mt-3 ml-1`}>No Benefites Detail</p>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}

        {currentAplicant.length === 0 && (
          <>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ alignItems: 'center', textAlign: 'center' }}
            >
              <div className='mt-5'>
                <h6 className='mt-5'>You have no Post. Add New Post</h6>
                <img
                  className='mt-0'
                  src='https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png'
                  style={{ width: '250px', height: '250px' }}
                />
              </div>
            </Col>
          </>
        )}

        <Col xs={12} sm={12} md={12} lg={12} className='mt-1 '>
          <Pagination
            aplicantPerPage={aplicantPerPage}
            totalAplicant={post.length}
            paginate={paginate}
          />
        </Col>
      </Row>
      <EditPost
        show={show1}
        handleClose={handleClose1}
        handleShow={handleShow1}
        data={infos}
        fetchPost={fetchPost}
      />
    </>
  );
}
