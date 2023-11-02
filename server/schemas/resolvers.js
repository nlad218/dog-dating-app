const { User, Match, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET route: user, findOne
    user: async (parent, { userId }) => {
      const singleUser = await User.findOne({ _id: userId });
      console.log(singleUser);
      return singleUser;
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
    //don't need this, this should be in the GET ME ROUTE (.populate matches)
    // Get route: match, find one specific match
    oneMatch: async (parent, { matchId }) => {
      return Match.findOne({ _id: matchId });
    },
    // // GET route: purpose - find selected user's likes and return them
    getLikes: async (parent, { userId }) => {
      const userInfo = await User.findOne({ _id: userId });
      console.log(userInfo);
      //const likesArray = userInfo.likes
    },
  },
  Mutation: {
    // CREATE route: create user account - Maya
    createUser: async (parent, { ownerName, email, password }) => {
      const user = await User.create({ ownerName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // DELETE route: delete user account
    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        const user = await User.findOneAndRemove({
          _id: userId,
          ownerName: context.user.ownerName,
        });

        return { message: "Account deleted successfully." };
      }
      throw AuthenticationError;
    },
  },

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

  updateUser: async (
    parent,
    { userId, newOwnerName, newEmail, newPassword },
    context
  ) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId, ownerName: context.user.ownerName },
        { ownerName: newOwnerName, email: newEmail, password: newPassword },
        { new: true }
      );

      if (updatedUser) {
        return { message: "Account updated successfully.", user: updatedUser };
      } else {
        throw new UserInputError("Update failed.");
      }
    }
    throw AuthenticationError;
  },

  // // CREATE route: post a message

  // // PUT route: update user account with an added friend
  addLike: async (parent, { myId, otherId }) => {
    const myProfile = await User.findOneAndUpdate(
      { _id: myId },
      { $push: { likes: otherId } },
      { new: true }
    );
  },

  // // CREATE route: match two users together
  //   // isAMatch: async (parent, {myId, otherId}) => {
  //   //   const myProfile = await User.findOne({_id: myId})
  //   //   const myLikes = myProfile.likes

  //   //   const otherProfile = await User.findOne({_id: otherId})
  //   //   const otherLikes = otherProfile.likes

  //   // }
};

module.exports = resolvers;
