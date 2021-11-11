import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_NEWS } from '../../utils/mutations';  //*THOUGHT -NEWS
import { QUERY_NEWS} from '../../utils/queries'; //*QUERY_ME was removed

import Auth from '../../utils/auth';

const NewsForm = () => { //* NewsForm
  const [newsText, setNewsText] = useState(''); //*newsText, setNewsText

  const [characterCount, setCharacterCount] = useState(0);

  const [addNews, { error }] = useMutation(ADD_NEWS, { //* ADD_NEWS
    update(cache, { data: { addNews } }) {  //* addNews
   

      

      try {
        const { newss } = cache.readQuery({ query: QUERY_NEWS });  //*QUERY_NEWS

        cache.writeQuery({
          query: QUERY_NEWS, //*QUERY_NEWS
          data: { newss: [addNews, ...newss] },  //*news:  addNews, ...news
        });
      } catch (e) {
        console.error(e);
      }


    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNews({ //eslint-disable-line no-unused-vars 
        variables: {
          newsText,  
          newsAuthor: Auth.getProfile().data.username, 
          
        },
      });

      setNewsText(''); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'newsText' && value.length <= 200) {
      setNewsText(value); 
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h8>NEWS FEED</h8>
      
      
      <h3>Crypto Traders! What happened NOW? 🌎</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 200 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/200
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="newsText"  
                placeholder="Share your Global NEWS"
                value={newsText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-lg btn-primary btn-block py-5" type="submit">
                💬
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to 🔐 Log in' to share NEWS.    
            
          ✨Please{' '}

          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>✨
        </p>
        
      )}
      <p className="p2">⛔ There is a strict legal action if you share Fake NEWS </p>
      <p className="p3">🔞 No personal opinion or thoughts, No Nudity, No violent contents</p>
      
    </div>
  );
};

export default NewsForm; 
