import api from './api';

export const getFriends = async () => {
  const { data } = await api.get('/friends');
  return data;
};

export const getFriendRequests = async () => {
  const { data } = await api.get('/friends/requests');
  return data;
};

export const sendFriendRequest = async (recipientId) => {
  const { data } = await api.post(`/friends/request/${recipientId}`);
  return data;
};

export const acceptFriendRequest = async (requestId) => {
  const { data } = await api.put(`/friends/accept/${requestId}`);
  return data;
};
