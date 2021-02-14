const config = require('../config/config');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Twit = require('twit')

const userSchema = Joi.object({
  twitterHandle: Joi.string().required(),
  twitterId_str: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
  insert
}

async function insert(user) {
  user.twitterId_str = await getTwitterId(user.twitterHandle);
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}


async function getTwitterId(twitterHandle) {

  //refactor so im not constantly making new twits
  let T = new Twit({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerKeySecret,
    access_token: config.twitterAccessToken,
    access_token_secret: config.twitterAccessTokenSecret,
  });

  T.get('users/show', { screen_name: 'predictit_scout' }, // twitterHandle
      function(err, data, response) {
      if (err) {
        console.error(err);
      } else {
        return data.id_str;
      }
    });
  }