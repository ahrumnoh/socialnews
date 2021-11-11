import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({ 
  newss, 
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!newss.length) {
    return <h3>No NEWS Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {newss &&  
        newss.map((news) => ( 

             
          <div key={news._id} className="card mb-3">   
            <h4 className="card-header bg-dark text-white p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${news.newsAuthor}`} 
                >
                  {news.newsAuthor} <br /> 
                  
                  <span style={{ fontSize: '1rem' }}>
                    on {news.createdAt}
                  </span> 
                </Link> 
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    on {news.createdAt} 
                  </span> 
                </>
              )} 
            </h4> 
            <div className="card-body bg-dark text-white p-2">
              <p>{news.newsText}</p> 
            </div> 
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/newss/${news._id}`}
            >
              ✍ Leave a comment
            </Link> 
          </div>
        ))} 
    </div>  
  );
};

export default NewsList; 
