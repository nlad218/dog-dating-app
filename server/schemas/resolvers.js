const { User, Match, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // GET route: user, findOne
    user: async (parent, { userId }) => {
      const singleUser = await User.findOne({ _id: userId })
        .populate("likes")
        .populate({
          path: "matches",
          populate: [
            { path: "messages" },
            { path: "user2" },
            { path: "messages" },
          ],
        });
      return singleUser;
    },
    // GET route: users, find
    users: async () => {
      return User.find()
        .populate("likes")
        .populate({
          path: "matches",
          populate: [
            { path: "messages" },
            { path: "user2" },
            { path: "messages" },
          ],
        });
    },
    // // GET route: me, findOne
    me: async (parent, args, { user }) => {
      if (user) {
        return await User.findById({ _id: user._id })
          .populate("hobbies")
          .populate({
            path: "matches",
            populate: [{ path: "user1" }, { path: "user2" }],
          });
      }
      throw new AuthenticationError();
    },

    // Get route: match, find one specific match
    oneMatch: async (parent, { matchId }) => {
      return Match.findOne({ _id: matchId })
        .populate("user1")
        .populate("user2")
        .populate("messages");
    },

    // // GET route: purpose - find selected user's likes and return them
    getLikes: async (parent, { userId }) => {
      const userInfo = await User.findOne({ _id: userId }).populate("likes");
      return userInfo;
    },
    //filters already liked profiles and own profile
    getRandomUsers: async (parent, args, { user }) => {
      if (user) {
        let res = await User.findOne({ _id: user._id });

        let skipTheseIds = res.likes;

        let ids = [];

        skipTheseIds.push(user._id);
        skipTheseIds.map((index) => {
          ids.push(index.toString());
        });

        let allUsers = await User.find({ _id: { $nin: ids } }).populate({
          path: "likes",
          model: "User",
        });

        if (allUsers.length === 0) throw new Error("You are out users to like");
        //fisher-yates sort
        for (let i = allUsers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = allUsers[i];
          allUsers[i] = allUsers[j];
          allUsers[j] = temp;
        }
        return allUsers;
      }
      throw AuthenticationError;
    },
    //filter out already liked profile,own profile, then shows alike breeds
    filterUsersByBreed: async (parent, args, { user }) => {
      let skipTheseIds = user.likes;
      skipTheseIds.push(user._id);
      const filteredBreed = await User.find({
        $and: [{ breed: { $eq: user.breed } }, { _id: { $nin: skipTheseIds } }],
      }).populate("likes");

      //fisher yates sort
      for (let i = filteredBreed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = filteredBreed[i];
        filteredBreed[i] = filteredBreed[j];
        filteredBreed[j] = temp;
      }
      return filteredBreed;
    },
  },
  Mutation: {
    addToLikes: async (parent, { otherId }, { user }) => {
      //if not already liked, update user profile
      const updateMyProfile = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { likes: otherId } },
        { new: true }
      ).populate("likes");
      console.log("Added user to your likes list");
    },
    createMatch: async (parent, { otherId }, { user }) => {
      const newMatch = await Match.create({
        user1: user._id.toString(),
        user2: otherId.toString(),
      });
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { matches: newMatch._id } }
      );
      await User.findOneAndUpdate(
        { _id: otherId },
        { $push: { matches: newMatch._id } }
      );
      return newMatch;
    },
    // CREATE route: create user account - Maya
    createUser: async (parent, { ownerName, email, password }) => {
      const user = await User.create({
        ownerName: ownerName,
        email: email,
        password: password,
        image: "empty-profile_ttux5f",
      });
      const token = signToken(user);
      return { token, user };
    },

    // DELETE route: delete user account
    deleteUser: async (parent, { userId }, { user }) => {
      if (context.user) {
        const user = await User.findOneAndRemove({
          _id: user._id,
        });

        return { message: "Account deleted successfully." };
      }
      throw AuthenticationError;
    },

    // LOGIN: login User
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

    // PUT: update user
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updateInfo = { ...args };
        if (updateInfo.password) {
          const saltRounds = 10;
          updateInfo.password = await bcrypt.hash(
            updateInfo.password,
            saltRounds
          );
        }
        updateInfo.image = args.image;
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, ownerName: context.user.ownerName },
          { ...updateInfo },
          { new: true }
        );
        if (updatedUser) {
          return {
            message: "Account updated successfully.",
            user: updatedUser,
          };
        } else {
          throw new UserInputError("Update failed.");
        }
      }
      throw AuthenticationError;
    },

    // // PUT route: check if user already liked, then update user with new like, then check for match then create match
    addLikeCheckAddMatch: async (parent, { otherId }, { user }) => {
      //check if they are already liked
      let alreadyLiked = false;
      const myProfile = await User.findOne({ _id: user._id }).populate("likes");
      myProfile.likes.forEach(async (like) => {
        if (like._id.toString() === otherId) {
          alreadyLiked = true;
        }
      });
      //must return outside ForEach
      if (alreadyLiked) {
        console.log("User already liked this profile");
        return myProfile;
      }

      //if not already liked, update user profile
      const updateMyProfile = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { likes: otherId } },
        { new: true }
      ).populate("likes");
      console.log("Added user to your likes list");
      //check if other profile already liked current user
      let isAMatch = false;
      const otherProfile = await User.findOne({ _id: otherId }).populate(
        "likes"
      );
      otherProfile.likes.forEach(async (otherLike) => {
        if (otherLike._id.toString() === myProfile._id.toString()) {
          const newMatch = await Match.create({
            user1: user._id.toString(),
            user2: otherId.toString(),
          });
          //update both Users with new Match model
          await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { matches: newMatch._id } }
          );
          await User.findOneAndUpdate(
            { _id: otherId },
            { $push: { matches: newMatch._id } }
          );
          isAMatch = true;
        }
      });
      //must return outside ForEach
      if (isAMatch) {
        console.log("YOU MATCHED");
        return newMatch;
      } else {
        return myProfile;
      }
    },
    //POST: create Message
    createMessage: async (parent, { matchId, messageText }, { user }) => {
      const newMessage = await Message.create({ user: user._id, messageText });
      const updateMatch = await Match.findOneAndUpdate(
        { _id: matchId },
        { $push: { messages: newMessage } }
      );
      console.log("Created new message and stored to Match");
      return updateMatch;
    },
  },
};

module.exports = resolvers;
