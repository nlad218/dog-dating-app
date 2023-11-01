const { User, Match, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET route: user, findOne
    user: async (parent, {userId}) => {
      return User.findOne({_id: userId})
    },
    // GET route: users, find

    // GET route: me, findOne

    // GET route: messages, 

    // GET route: matches, see all matches
        //don't need this, this should be in the GET ME ROUTE (.populate matches)
    // Get route: match, find one specific match 
    oneMatch: async(parent, {matchId}) => {
      return Match.findOne({_id: matchId})
    },
    // GET route: purpose - find selected user's likes and return them
    getLikes: async(parent, {userId}) => {
      const userInfo = await User.findOne({_id: userId}); 
      console.log(userInfo)
      //const likesArray = userInfo.likes
    }

  },
  Mutations: {
// CREATE route: handles login 
login: async (parent, { email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw AuthenticationError;
  }

  const correctPw = await user.isCorrectPassword(password);

  if (!correctPw) {
    throw AuthenticationError;
  }

  const token = signToken(user);

  return { token, user };
},
// CREATE route: create user account

// DELETE route: delete user account 

// PUT route: update user account 

// CREATE route: post a message 

// CREATE route: match two users together 
  isAMatch: async (parent, {myId, otherId}) => {
    const myProfile = await User.findOne({_id: myId})
    const myLikes = myProfile.likes
    
    const otherProfile = await User.findOne({_id: otherId})
    const otherLikes = otherProfile.likes

  }
  },
};

module.exports = resolvers;
