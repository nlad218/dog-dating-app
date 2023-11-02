const { User, Match, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET route: user, findOne
    user: async (parent, {userId}) => {
      const singleUser = await User.findOne({_id: userId}).populate('likes').populate('matches').populate('messages');
      console.log(singleUser)
      console.log(singleUser.likes[0].breed)
      return singleUser;
    },
    // GET route: users, find
    users: async () => {
      return User.find().populate('likes').populate('matches').populate('messages');
    },
    // // GET route: me, findOne
    me: async (parent, args, {user}) => {
      return User.findById({ _id: user._id });
      },
    // GET route: messages,

    // GET route: matches, see all matches
        //don't need this, this should be in the GET ME ROUTE (.populate matches)
    // Get route: match, find one specific match 
    oneMatch: async(parent, {matchId}) => {
      return Match.findOne({_id: matchId})
    },
    // // GET route: purpose - find selected user's likes and return them
    getLikes: async(parent, {userId}) => {
      const userInfo = await User.findOne({_id: userId}); 
      console.log(userInfo)
      //const likesArray = userInfo.likes
    }

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
        const user = await User.findOne({email});
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
// DELETE route: delete user account

// // PUT route: update user account 

// // CREATE route: post a message 

// // PUT route: check if user already liked, then update user with new like, then check for match then create match
    addLikeCheckAddMatch: async (parent, {otherId}, {user}) => {
      //check if they are already liked
      let alreadyLiked = false;
      const myProfile = await User.findOne({_id: user._id}).populate('likes')
      myProfile.likes.forEach(async (like) => {
        if(like._id.toString() === otherId){
          alreadyLiked = true;
        }
      })
      //must return outside ForEach
      if(alreadyLiked){
        console.log("User already liked this profile")
        return myProfile
      }

       //if not already liked, update user profile
      const updateMyProfile = await User.findOneAndUpdate(
        {_id: user._id},
        {$push: {likes: otherId}},
        {new: true}
      ).populate('likes');
      //check if other profile already liked current user
      let isAMatch = false;
      const otherProfile = await User.findOne({_id: otherId}).populate('likes')
      otherProfile.likes.forEach(async (otherLike) => {
          if(otherLike._id.toString() === myProfile._id.toString()){
            const newMatch = await Match.create({user1:user._id.toString(), user2: otherId.toString()});
            //update both Users with new Match model
            await User.findOneAndUpdate(
              {_id: user._id},
              {$push:{matches: newMatch._id}})
            await User.findOneAndUpdate(
              {_id: otherId},
              {$push:{matches: newMatch._id}})
            isAMatch = true;  
          }
       })
       //must return outside ForEach
       if(isAMatch){
        console.log("YOU MATCHED")
        return newMatch;
       }else{
        return myProfile;
       }

    },
    //POST: create Message
  createMessage: async (parent, {matchId, messageText}, {user}) => {
      const newMessage = await Message.create({user: user._id, messageText})
      const updateMatch = await Match.findOneAndUpdate({_id: matchId},{$push: {messages: newMessage}})
      console.log("Created new message and stored to Match")
      return updateMatch;
    }
    },

};

module.exports = resolvers;
