const config = require('../config/config');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const fetch = require("node-fetch");
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
  const data = await fetch('https://api.twitter.com/1.1/users/show.json?screen_name=' + twitterHandle, {
      method: 'GET',
      headers: {
      'Content-Type': 'text/plain',
      'X-My-Custom-Header': 'value-v',
      'Authorization': 'Bearer ' + config.twitterBearer,
      }})
      .then(response => response.json());
    return data.id_str; //ids can be longer than 17 places which is higher than javascripts number precision
  
}

