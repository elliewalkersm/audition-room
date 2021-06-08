import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { addProject, updateProject } from '../helpers/data/ProjectData';

function AddProjectForm({
  user, setProjects, formTitle, ...projectInfo
}) {
  const [project, setProject] = useState({
    title: projectInfo?.title || '',
    location: projectInfo?.location || '',
    venue: projectInfo?.venue || '',
    dates: projectInfo?.dates || '',
    uid: user.uid,
    firebaseKey: projectInfo?.firebaseKey || null
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.firebaseKey) {
      updateProject(project, user.uid).then((projectsArray) => {
        setProjects(projectsArray);
        history.push('/projects');
      });
    } else {
      addProject(project, user.uid).then((response) => {
        setProjects(response);
        history.push('/projects');
      });
    }
  };

  return (
    <div className="project-form-container mt-5">
      <Form
        className='project-input-form'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <Label></Label>
        <Input
          name='title'
          type='text'
          placeholder='Project Title'
          value={project.title}
          onChange={handleInputChange}
        >
        </Input>
        <Label></Label>
        <Input
          name='location'
          type='text'
          placeholder='location'
          value={project.location}
          onChange={handleInputChange}
        >
        </Input>
        <Label></Label>
        <Input
          name='venue'
          type='text'
          placeholder='venue'
          value={project.venue}
          onChange={handleInputChange}>
        </Input>
        <Input
          name='dates'
          type='text'
          placeholder='dates'
          value={project.dates}
          onChange={handleInputChange}>
        </Input>
        <Button className="project-form-submit-btn mt-4" color='success' size="sm" type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

AddProjectForm.propTypes = {
  user: PropTypes.any,
  formTitle: PropTypes.string.isRequired,
  projectInfo: PropTypes.object,
  setProjects: PropTypes.func,
};

export default AddProjectForm;
