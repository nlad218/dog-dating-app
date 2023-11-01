const { User, Match, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET route: user, findOne

    // GET route: users, find

    // GET route: me, findOne

    // GET route: messages, 

    // GET route: matches, see all matches

    // Get route: match, find one specific match 

    // GET route: purpose - find selected user's likes and return them 
  },
  Mutations: {
// CREATE route: handles login 

// CREATE route: create user account

// DELETE route: delete user account 

// PUT route: update user account 

// CREATE route: post a message 

// CREATE route: match two users together 
  },
};

module.exports = resolvers;
