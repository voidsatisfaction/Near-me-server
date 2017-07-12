import { api } from './base';

function getCurrentLocationName({ lat, lng }) {
  return api.get(`/myplace?lat=${lat}&lng=${lng}`)
    .then((res) => (res));
}

function getNearEvent({ placeName }) {
  return api.get(`/myplace/event?place=${placeName}`)
    .then((res) => (res));
}

export default {
  getCurrentLocationName,
  getNearEvent,
};