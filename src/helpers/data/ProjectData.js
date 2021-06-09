import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getProjects = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/project.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deleteProject = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/project/${firebaseKey}.json`)
    .then(() => getProjects(uid).then((response) => resolve(response)))
    .catch((error) => reject(error));
});

const addProject = (project, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/project.json`, project)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/project/${response.data.name}.json`, body)
        .then(() => {
          getProjects(uid).then((projectArray) => resolve(projectArray));
        });
    })
    .catch((error) => reject(error));
});

const updateProject = (project, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/project/${project.firebaseKey}.json`, project)
    .then(() => getProjects(uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getProjects,
  deleteProject,
  addProject,
  updateProject
};
