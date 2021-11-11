const { AuthenticationError } = require('apollo-server-express');
const { User, News } = require('../models'); 
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('newss'); 
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('newss'); 
    },
    newss: async (parent, { username }) => {
      const params = username ? { username } : {};
      return News.find(params).sort({ createdAt: -1 }); 
    },
    news: async (parent, { newsId }) => { 
      return News.findOne({ _id: newsId }); 
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('newss'); 
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addNews: async (parent, { newsText }, context) => { 
      if (context.user) {
        const news = await News.create({ 
          newsText, 
          newsAuthor: context.user.username, 
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { newss: news._id } }  
        );

        return news; 
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { newsId, commentText }, context) => {
      if (context.user) {
        return News.findOneAndUpdate(
          { _id: newsId }, 
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeNews: async (parent, { newsId }, context) => {  
      if (context.user) {
        const news = await News.findOneAndDelete({  
          _id: newsId, 
          newsAuthor: context.user.username, 
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { newss: news._id } } 
        );

        return news; 
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { newsId, commentId }, context) => { 
      if (context.user) {
        return News.findOneAndUpdate(
          { _id: newsId }, 
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
