import React from 'react';
import { Link } from 'react-router-dom';
import logoGolden from '../../images/Mylogo1.ico';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
      <img src={logoGolden} alt="goldenpiggylogo"/>
        <div>          
          <Link className="text-light" to="/">
            <h1 className="m-0">Golden Piggy Crytpo</h1>
          </Link>
          <br></br>
          <p className="m-0">Global NEWS & Insight of Investment by Crypto Traders</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-sm btn-danger m-2" to="/me">
                {Auth.getProfile().data.username}'s 🏡
              </Link>
              <button className="btn btn-sm btn-primary m-2">
                <a href="https://bit.ly/3nQyB4K">📡Crypto Blog</a></button>

              <button className="btn btn-sm btn-primary m-2">
                <a href="https://bit.ly/3Byndiq">💎Crypto Search</a></button> 

              <button className="btn btn-sm btn-primary m-2">
                <a href="https://goldenpiggychat.herokuapp.com">👋Live Chat</a></button>  

              <button className="btn btn-sm btn-warning m-2" onClick={logout}>
                🔓Logout
              </button>          
              
            </>
          ) : (
            <>
              <Link className="btn btn-md btn-light m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-md btn-danger m-2" to="/signup">
                Signup
              </Link>
            
            </>
          )}
          
        </div>
      </div>
    </header>
  );
};


export default Header;
