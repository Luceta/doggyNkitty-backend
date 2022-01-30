import Profile from "../model/profile";

export const addFollowing = async (userId, followerId) => {
  const currentUser = await Profile.findOneAndUpdate(
    { user: userId },
    {
      $push: { following: followerId },
      $inc: { followingCount: 1 },
    },
    { new: true }
  );

  console.log(currentUser, "user 001");

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
