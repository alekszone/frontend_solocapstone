import React, { useState } from 'react';
import { withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Col, Button,  Row, Alert } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Styles from './Login.module.css';
import Logo from './Logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const mapStateToProps = (state) => state;
function MyLogin(props) {
  const classes = useStyles();
  const url = process.env.REACT_APP_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginWorker, setLoginWorker] = useState(
    props.registerWorker.registerWorker === 'worker' ? true : false
  );
  const [loginCompany, setLoginCompany] = useState(
    props.registerWorker.registerWorker === 'company' ? true : false
  );
  const [alert, setAlert] = useState(false);

  const showLogin = props.registerWorker;

  const worker = async () => {
    const moreData = await fetch(url + '/profile/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (moreData.ok) {
      const data = await moreData.json();

      localStorage.setItem('token', data.token);
      props.UserProfile();
      props.logInWorker();
      props.history.push('/worker');
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  const company = async () => {
    const result = await fetch(url + '/login/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),

      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    if (result.ok) {
      const data = await result.json();

      localStorage.setItem('token', data.token);
      setAlert(false);
      props.CompanyProfile();
      props.loginCompany();
      props.history.push('/company');
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      <Row className={`${Styles.rows}`}>
        {loginWorker && (
          <>
            <Col xs={12} sm={12} md={5} lg={5} className='mt-5'>
              <div className={`${Styles.title} mt-5`}>
                <img src={Logo} style={{ width: '70%' }} />
                <h4>Find your future job in TECH JOBS</h4>
                <Button onClick={props.sendTo}>Back</Button>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} className='mt-5'>
              <div
                style={{
                  height: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                className='mt-5 mb-4'
              >
                <form
                  className={`${Styles.form} `}
                  noValidate
                  autoComplete='off'
                >
                  <div className='mt-2 mb-4'>
                    <TextField
                      id='filled-multiline-flexible'
                      label='Email'
                      defaultValue='Hello World'
                      variant='outlined'
                      value={email}
                      style={{
                        width: '90%',
                      }}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </div>
                  <div className='mt-2 mb-4'>
                    <TextField
                      id='filled-multiline-flexible'
                      label='Password'
                      type='password'
                      defaultValue='Hello World'
                      variant='outlined'
                      style={{
                        width: '90%',
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <Button
                    variant='light'
                    className={`${Styles.btngrad}`}
                    style={{ width: '100px' }}
                    onClick={() => worker()}
                  >
                    Login
                  </Button>
                  <br></br>
                  <br></br>
                  You are new .... ?{' '}
                  <Button
                    variant='light'
                   style={{color:" rgb(63, 69, 95)",fontWeight:"bolder", backgroundColor:"transparent"}}
                   className="mb-2"
                    onClick={() => props.register()}
                  >
                    Register
                  </Button>
                </form> 
                 <div>
                {alert && (
                  <Alert variant='danger' className={`${Styles.input}`}>
                    Check again Your Login credentials
                  </Alert>
                )}
              </div>{' '}
              </div>
            
            </Col>
          </>
        )}
        {loginCompany && (
          <>
            <Col xs={12} sm={12} md={5} lg={5} className='mt-5'>
              <div className={`${Styles.title} mt-5`}>
                <img src={Logo} style={{ width: '70%' }} />
                <h4>Find your future job in TECH JOBS</h4>
                <Button onClick={props.sendTo}>Back</Button>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} className='mt-5'>
              <div
                style={{
                  height: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                className='mt-5 mb-4'
              >
                <form
                  className={`${Styles.form} `}
                  noValidate
                  autoComplete='off'
                >
                  <div className='mt-2 mb-4'>
                    <TextField
                      id='filled-multiline-flexible'
                      label='Email'
                      defaultValue='Hello World'
                      variant='outlined'
                      value={email}
                      style={{
                        width: '90%',
                      }}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </div>
                  <div className='mt-2 mb-4'>
                    <TextField
                      id='filled-multiline-flexible'
                      label='Password'
                      type='password'
                      defaultValue='Hello World'
                      variant='outlined'
                      style={{
                        width: '90%',
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <Button
                    variant='light'
                    className={`${Styles.btngrad}`}
                    style={{ width: '100px' }}
                    onClick={() => company()}
                  >
                    Login
                  </Button>
                  <br></br>
                  <br></br>
                  You are new .... ?{' '}
                  <Button
                    variant='light'
                    style={{color:" rgb(63, 69, 95)",fontWeight:"bolder", backgroundColor:"transparent"}}
                    className="mb-2"
                    onClick={() => props.register()}
                  >
                    Register
                  </Button>
                </form><div>
                {alert && (
                  <Alert variant='danger' className={`${Styles.input}`}>
                    Check again Your Login credentials
                  </Alert>
                )}
              </div>{' '}
              </div>
              
            </Col>
          </>
        )}
      </Row>
    </>
  );
}

export default withRouter(connect(mapStateToProps)(MyLogin));
