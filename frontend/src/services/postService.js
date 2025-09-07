import api from './api';

export const getPosts = async () => {
  const { data } = await api.get('/posts');
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post('/posts', postData);
  return data;
};

export const likePost = async (postId) => {
  const { data } = await api.put(`/posts/${postId}/like`);
  return data;
};

export const commentOnPost = async (postId, commentData) => {
  const { data } = await api.post(`/posts/${postId}/comment`, commentData);
  return data;
};
