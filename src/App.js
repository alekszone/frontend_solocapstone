import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Header/Headers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/LoginWorker';
import HomePage from './pages/HomePage';
import ProfileWorker from './pages/Profile';
import Company from './pages/HomeCompany';
import ProfileCompany from './pages/ProfileCompany';
import CompanyPosts from './pages/CompanyPosts';
import AllAplication from './components/Homepage/AllAplication';


function App() {
  const [companyNavBar, setcompanyNavBar] = useState(false);
  const [userNavBar, setuserNavBar] = useState(false);
  const [landingPageNavBar, setlandingPageNavBar] = useState(true);
  const url = process.env.REACT_APP_URL;
  const userProfile = async () => {
    const result = await fetch(url + '/profile/profile', {
      method: 'GET',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (result.ok) {
      setuserNavBar(true);
      setlandingPageNavBar(false);
      console.log('it is coming here');
    } else {
      setuserNavBar(false);
      setlandingPageNavBar(true);
      console.log('it is not coming here');
    }
  };

  const companyProfile = async () => {
    const result = await fetch(url + '/login/profile', {
      method: 'GET',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (result.ok) {
      setcompanyNavBar(true);
      setlandingPageNavBar(false);
      console.log('it is coming here');
    } else {
      setcompanyNavBar(false);
      setlandingPageNavBar(true);
      console.log('it is not coming here');
    }
  };

  const logOut = () => {
    setcompanyNavBar(false);
    setuserNavBar(false);
  };
  const logInWorker = () => {
    setuserNavBar(true);
  };
  const loginCompany = () => {
    setcompanyNavBar(true);
  };

  useEffect(() => {
    companyProfile();
    userProfile();
  }, []);

  return (
    <div>
      <Router>
        <Navbar
          companyNavBar={companyNavBar}
          userNavBar={userNavBar}
          landingPageNavBar={landingPageNavBar}
          UserProfile={userProfile}
          CompanyProfile={companyProfile}
          logOut={logOut}
        />
        <Switch>
          <Route path='/' exact>
            <Login
              UserProfile={userProfile}
              CompanyProfile={companyProfile}
              logInWorker={logInWorker}
              loginCompany={loginCompany}
            />
          </Route>
          <Route path='/aplication' exact component={AllAplication} />
          <Route path='/worker' exact component={HomePage} />
          <Route path='/workerProfile' exact component={ProfileWorker} />
          <Route path='/company' exact component={Company} />
          <Route path='/companyProfile' exact component={ProfileCompany} />
          <Route path='/companyPosts' exact component={CompanyPosts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
