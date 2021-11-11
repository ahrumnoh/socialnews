const db = require('../config/connection');
const { User, News } = require('../models');
const userSeeds = require('./userSeeds.json');
const newsSeeds = require('./newsSeeds.json');

db.once('open', async () => {
  try {
    await News.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < newsSeeds.length; i++) {
      const { _id, newsAuthor } = await News.create(newsSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: newsAuthor },
        {
          $addToSet: {
            newss: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
