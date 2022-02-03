import Profile from "../model/profile";
import User from "../model/user";

export const addFollowing = async (userId, followerId) => {
  const currentUser = await Profile.findOneAndUpdate(
    { user: userId },
    {
      $push: { following: followerId },
      $inc: { followingCount: 1 },
    },
    { new: true }
  );

  const follower = await Profile.findOneAndUpdate(
    { user: followerId },
    {
      $push: { follower: userId },
      $inc: { followerCount: 1 },
    },
    { new: true }
  );

  return { user: currentUser, follower };
};

export const removeFollower = async (userId, followerId) => {
  const currentUser = await Profile.findOneAndUpdate(
    { user: userId },
    {
      $pull: { following: followerId },
      $inc: { followingCount: -1 },
    },
    { new: true }
  );

  const follower = await Profile.findOneAndUpdate(
    { user: followerId },
    {
      $pull: { follower: userId },
      $inc: { followerCount: -1 },
    },
    { new: true }
  );

  return { user: currentUser, follower };
};

export const getFollowings = async (userId, account) => {
  const user = await Profile.findOne({ user: userId });
  const followingList = user.following;
  const options = {
    user: false,
  };
  const following = await Profile.find({ user: followingList }, options);

  return following;
};

export const getFollowers = async (userId, account) => {
  const user = await Profile.findOne({ user: userId });
  const followList = user.follower;
  const options = {
    user: false,
  };
  const follower = await Profile.find({ user: followList }, options);

  return follower;
};
