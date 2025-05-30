const {User, Thought} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
      me: async(parent, args, context)=>{
        if(context.user){
          const userData = await User.findOne({ _id: context.user._id})
            .select('-__v -password')
            .populate('thoughts')
            .populate('friends');
          return userData;
        }
        throw new AuthenticationError('Not logged in');
      },
      thoughts: async (parent, {username}) => {
        const params = username ? {username} : {};
        return Thought.find(params).sort({ createdAt: -1 });
      },
      thought: async (parent, {_id}) =>{
        return Thought.findOne({_id});
      },
      // get all users:
      users: async() =>{
        return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
      },
      user: async(parent, {username})=>{
        return User.findOne({username})
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
      }
    },
    Mutation:{
      
      addUser: async(parent, args)=>{
        const user = await User.create(args);
        const token = signToken(user);
        return {token, user};
      },
      
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token  =signToken(user);
        return {token, user};
      },

      addThought: async (parent, args, context) => {
        if (context.user) {
          const thought = await Thought.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
          return thought;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      addReaction: async (parent, { thoughtId, reactionBody }, context) => {
        if (context.user) {
          const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: { reactionBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
      
          return updatedThought;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          // Add friendId to current user's friends
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } }
          );
          // Add current user to friend's friends
          await User.findOneAndUpdate(
            { _id: friendId },
            { $addToSet: { friends: context.user._id } }
          );
          // Return the updated user with populated friends
          return User.findOne({ _id: context.user._id }).populate('friends');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      removeThought: async (parent, { thoughtId }, context) => {
        if (context.user) {
          const thought = await Thought.findOne({ _id: thoughtId });
          
          if (!thought) {
            throw new Error('Thought not found');
          }
          
          // Check if the thought belongs to the user
          if (thought.username !== context.user.username) {
            throw new AuthenticationError('You can only delete your own thoughts!');
          }
          
          // Remove the thought
          await Thought.findOneAndDelete({ _id: thoughtId });
          
          // Remove the thought reference from the user's thoughts array
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { thoughts: thoughtId } }
          );
          
          return thought;
        }
        throw new AuthenticationError('You need to be logged in!');
      }
    }
  };

module.exports = resolvers;