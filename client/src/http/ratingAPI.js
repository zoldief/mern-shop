import { $host } from './index';

export const createRating = async (rating) => {
  const { data } = await $host.post('api/rating', rating);
  return data;
};

export const fetchRating = async () => {
  const { data } = await $host.get('api/rating');
  return data;
};

export const fetchRatingByDeviceId = async (deviceId) => {
  const { data } = await $host.get('api/rating/' + deviceId);
  return data;
};
