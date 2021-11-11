import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import NewsForm from '../components/NewsForm';  //*NewsForm  //NewsForm
import NewsList from '../components/NewsList';  //*NEwsList   //NewsList

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        💥You need to be logged in to see this!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'trader'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5"> 
          <NewsList
            newss={user.newss}
            title={`${user.username}'s NEWS`}
            showTitle={false}
            showUsername={false}
          />
        </div> 
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '3px dotted #1a1a1a' }}
          >
            <NewsForm />
          </div>  
        )}
      </div>
    </div>
  );
};

export default Profile;