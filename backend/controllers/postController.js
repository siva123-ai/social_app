const Post = require('../models/Post');
const User = require('../models/User');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username profilePicture').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  const { text, mediaUrl } = req.body;

  try {
    const post = await Post.create({
      user: req.user.id,
      text,
      mediaUrl,
    });

    const populatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(req.user.id)) {
      // Unlike
      post.likes = post.likes.filter((userId) => userId.toString() !== req.user.id);
    } else {
      // Like
      post.likes.push(req.user.id);
    }

    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.commentOnPost = async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user.id,
      text,
    };

    post.comments.push(comment);

    await post.save();

    // Populate user details for the new comment
    const newComment = post.comments[post.comments.length - 1];
    const user = await User.findById(newComment.user, 'username profilePicture');
    newComment.user = user;


    res.status(201).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
