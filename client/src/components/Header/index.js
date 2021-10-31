import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';


const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
      <header className="bg-dark text-white mb-4 py-3 flex-row align-center">
          <div className="container flex-row justify-space-between-lg justify-center align-center">
              <div>
                  <Link className="text-light" to="/">
                      <h1 className="m-0">Golden Piggy Crypto</h1>
                  </Link>
                  <p className="m-0"> Let's share Global NEWS & Insight of trading for better future</p>
              </div>
              <div>
                  {Auth.loggedIn() ? (
                      <>
                      <Link className= "btn btn-lg btn-primary m-2" to="/me">
                          {Auth.getProfile().data.username}'s Dashboard
                       </Link>
                       <Link className="btn btn-lg btn-danger m-2" to={{ pathname: "http://github.com"}}>
                        Crypto Blog
                      </Link>
                      <Link className= "btn btn-lg btn-info m-2" to="/me">
                          Live Chat
                      </Link>
                      <button className="btn btn-lg btn-primary m-2" onClick={logout}>
                          Logout
                      </button>
                      </>
                  ) : (
                      <>
                      <Link className="btn btn-lg btn-info m-2" to="/login">
                          login
                      </Link>
                      <Link className="btn btn-lg btn-info m-2" to="/signup">
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