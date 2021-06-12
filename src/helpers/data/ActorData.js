import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getActors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/actor.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deleteActor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/actor/${firebaseKey}.json`)
    .then(() => getActors(uid).then((response) => resolve(response)))
    .catch((error) => reject(error));
});

const addActor = (actor, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/actor.json`, actor)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/actor/${response.data.name}.json`, body)
        .then(() => {
          getActors(uid).then((actorArray) => resolve(actorArray));
        });
    })
    .catch((error) => reject(error));
});

const updateActor = (actor, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/actor/${actor.firebaseKey}.json`, actor)
    .then(() => getActors(uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getActors,
  deleteActor,
  addActor,
  updateActor
};
