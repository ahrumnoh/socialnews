import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_NEWS } from '../utils/queries';  

const SingleNews = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`

  //* singleNews
  const { newsId } = useParams();  

  const { loading, data } = useQuery(QUERY_SINGLE_NEWS, { 
    // pass URL parameter
    variables: { newsId: newsId }, 
  });

  const news = data?.news || {}; 

  if (loading) {
    return <div>Loading...</div>;
  } 
  return (
    <div className="my-3"> 
      <h3 className="card-header bg-dark text-light p-2 m-0"> 
      
        {news.newsAuthor} <br /> 
        <span style={{ fontSize: '1rem' }}>
           on {news.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '2',
          }}  
        >
          {news.newsText} 
        </blockquote>
      </div>  
      
      <div className="my-5"> 
        <CommentList comments={news.comments} />
      </div> 
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}> 
        <CommentForm newsId={news._id} />
      </div> 
    </div> 
  );
};

export default SingleNews; 
