import React, { useState, useEffect } from 'react';
import { getPosts, createPost, likePost, commentOnPost } from '../services/postService';
import { getFriends, getFriendRequests, sendFriendRequest, acceptFriendRequest } from '../services/friendService';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedPosts, fetchedFriends, fetchedFriendRequests] = await Promise.all([
        getPosts(),
        getFriends(),
        getFriendRequests(),
      ]);
      setPosts(fetchedPosts);
      setFriends(fetchedFriends);
      setFriendRequests(fetchedFriendRequests);
    };
    fetchData();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = await createPost({ text });
    setPosts([newPost, ...posts]);
    setText('');
  };

  const handleLike = async (postId) => {
    const updatedLikes = await likePost(postId);
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, likes: updatedLikes } : post
      )
    );
  };

  const handleComment = async (postId, commentText) => {
    const updatedComments = await commentOnPost(postId, { text: commentText });
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, comments: updatedComments } : post
      )
    );
  };

  const handleSendFriendRequest = async (recipientId) => {
    await sendFriendRequest(recipientId);
    // You might want to update the UI to show that a request has been sent
  };

  const handleAcceptFriendRequest = async (requestId) => {
    await acceptFriendRequest(requestId);
    // Refresh friends and friend requests
    const [fetchedFriends, fetchedFriendRequests] = await Promise.all([
        getFriends(),
        getFriendRequests(),
      ]);
      setFriends(fetchedFriends);
      setFriendRequests(fetchedFriendRequests.filter(req => req._id !== requestId));

  }

  return (
    <div className="home-container">
        <div className="main-content">
             <h2>Home</h2>
      <form onSubmit={handleCreatePost}>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <div className="feed">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
                <img src={`https://i.pravatar.cc/150?u=${post.user.username}`} alt={post.user.username} />
                <p><strong>{post.user.username}</strong></p>
            </div>
            <p>{post.text}</p>
            <div className="post-actions">
                <button onClick={() => handleLike(post._id)}>{post.likes.length} Likes</button>
            </div>
            <div className="comment-section">
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                    <img src={`https://i.pravatar.cc/150?u=${comment.user.username}`} alt={comment.user.username} />
                    <p><strong>{comment.user.username}</strong> {comment.text}</p>
                </div>
              ))}
                 <form
              onSubmit={(e) => {
                e.preventDefault();
                const commentText = e.target.elements.comment.value;
                handleComment(post._id, commentText);
                e.target.reset();
              }}
            >
              <input type="text" name="comment" placeholder="Add a comment" />
              <button type="submit">Comment</button>
            </form>
            </div>
          </div>
        ))}
      </div>
        </div>
        <div className="sidebar">
            <div className="friends-list">
                 <h3>Friends</h3>
                 {friends.map(friend => (
                     <div key={friend._id}>{friend.username}</div>
                 ))}
            </div>
            <div className="friend-requests">
                <h3>Friend Requests</h3>
                {friendRequests.map(req => (
                    <div key={req._id}>
                        <span>{req.from.username}</span>
                        <button onClick={() => handleAcceptFriendRequest(req._id)}>Accept</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default HomePage;
