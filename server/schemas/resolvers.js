const { User, Match, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET route: user, findOne
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // GET route: users, find
    users: async () => {
      return User.find();
    },
    // GET route: me, findOne
    me: async (parent) => {
      return User.findById({ _id: User._id });
    },
    // GET route: messages,

    // GET route: matches, see all matches

    // Get route: match, find one specific match

    // GET route: purpose - find selected user's likes and return them
  },
  Mutation: {
    // CREATE route: handles login

    // CREATE route: create user account - Maya
    createUser: async (parent, { ownerName, email, password }) => {
      const user = await User.create({ ownerName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // DELETE route: delete user account - Maya

    // PUT route: update user account - Nick D
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const pwAuth = await user.isCorrctPassword(password);

      if (!pwAuth) {
        throw AuthenticationError;
      }
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // DELETE route: delete user account

    // PUT route: update user account

    // CREATE route: post a message

    // CREATE route: match two users together
  },
};

module.exports = resolvers;
