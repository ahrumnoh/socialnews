import { gql } from '@apollo/client';



export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      newss {
        _id
        newsText
        createdAt
      }
    }
  }
`;



export const QUERY_NEWS = gql`
  query getNews {
    newss {
      _id
      newsText
      newsAuthor
      createdAt
    }
  }
`;



export const QUERY_SINGLE_NEWS = gql`
  query getSingleNews($newsId: ID!) {
    news(newsId: $newsId) {
      _id
      newsText
      newsAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;




export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      newss {
        _id
        newsText
        newsAuthor
        createdAt
      }
    }
  }
`;