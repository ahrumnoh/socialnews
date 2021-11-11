const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const newsSchema = new Schema({ //newsSchema
  newsText: { //*newsText
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 200,
    trim: true,
  },
  newsAuthor: { //*newsAuthor
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const News = model('News', newsSchema);   
module.exports = News;  
