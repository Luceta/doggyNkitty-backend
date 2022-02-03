import Profile from "../model/profile";
import User from "../model/user";

export const addFollowing = async (userId, followerId) => {
  const options = {
    post: false,
  };

  await Profile.findOneAndUpdate(
    { user: userId },
    {
      $push: { following: followerId },
      $inc: { followingCount: 1 },
    },
    { new: true }
  );

  const user = await Profile.findOne({ user: userId }, options);

  await Profile.findOneAndUpdate(
    { user: followerId },
    {
      $push: { follower: userId },
      $inc: { followerCount: 1 },
    },
    { new: true }
  );

  const followerTest = await Profile.findOne({ user: followerId }, options);

  return { user, follower: followerTest };
};

export const removeFollower = async (userId, followerId) => {
  const options = {
    post: false,
  };

  await Profile.findOneAndUpdate(
    { user: userId },
    {
      $pull: { following: followerId },
      $inc: { followingCount: -1 },
    },
    { new: true }
  );

  const user = await Profile.findOne({ user: userId }, options);

  await Profile.findOneAndUpdate(
    { user: followerId },
    {
      $pull: { follower: userId },
      $inc: { followerCount: -1 },
    },
    { new: true }
  );

  const follower = await Profile.findOne({ user: followerId }, options);

  return { user, follower };
};

export const getFollowings = async (userId, account) => {
  const user = await Profile.findOne({ user: userId });
  const followingList = user.following;
  const options = {
    user: false,
    post: false,
  };
  const following = await Profile.find({ user: followingList }, options);

  return following;
};

export const getFollowers = async (userId, account) => {
  const user = await Profile.findOne({ user: userId });
  const followList = user.follower;
  const options = {
    user: false,
    post: false,
  };
  const follower = await Profile.find({ user: followList }, options);

  return follower;
};
