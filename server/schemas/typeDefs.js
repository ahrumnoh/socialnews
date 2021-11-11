const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    news: [News]!  
  }

  type News {
    _id: ID
    newsText: String 
    newsAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    newss(username: String): [News]
    news(newsId: ID!): News
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNews(newsText: String!): News
    addComment(newsId: ID!, commentText: String!): News
    removeNews(newsId: ID!): News
    removeComment(newsId: ID!, commentId: ID!): News
  }
`;

module.exports = typeDefs;