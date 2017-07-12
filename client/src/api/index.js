import { api } from './base';

function getCurrentLocationName({ lat, lng }) {
  return api.get(`/myplace?lat=${lat}&lng=${lng}`)
    .then((res) => (res));
}

function getNearEvents(placeName) {
  return api.get(`/myplace/events?place=${placeName}`)
    .then((res) => (res));
}

export default {
  getCurrentLocationName,
  getNearEvents,
};