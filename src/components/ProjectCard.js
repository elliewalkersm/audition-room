import React, { useState } from 'react';
import {
  CardBody,
  CardTitle,
  Button,
  Card,
  CardSubtitle
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteProject } from '../helpers/data/ProjectData';
import AddProjectForm from './AddProjectForm';

const ProjectCard = ({
  user,
  setProjects,
  ...projectsInfo
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'delete':
        deleteProject(projectsInfo.firebaseKey, user.uid).then((response) => setProjects(response));
        break;
      default:
        console.warn('Nothing Selected');
    }
  };

  const history = useHistory();

  const viewActors = () => {
    history.push(`/projects/${projectsInfo.firebaseKey}`);
  };

  return (
    <Card className="project-card">
    <CardBody>
      <CardTitle className="card-title mt-4 mb-3" tag="h5">{projectsInfo.title}</CardTitle>
      <CardSubtitle className="card-text mb-4" >{projectsInfo.location}</CardSubtitle>
      <CardSubtitle className="card-text mb-4" >{projectsInfo.venue}</CardSubtitle>
      <CardSubtitle className="card-text mb-4" >{projectsInfo.dates}</CardSubtitle>
      <Button color="primary" size="sm" onClick={viewActors}>Cast Details</Button>
      <hr></hr>
      <Button color="light" size="sm" onClick={() => handleClick('delete')}><i className="fas fa-trash"></i></Button>
      <Button color="light" size="sm" onClick={() => handleClick('edit')}>
        { editing ? 'Close Form' : 'Edit project'}
     </Button>
      {
        editing && <AddProjectForm
          formTitle='Edit Project'
          {...projectsInfo}
          setProjects={setProjects}
          user={user}
        />
      }
    </CardBody>
    </Card>
  );
};

ProjectCard.propTypes = {
  projectsInfo: PropTypes.object,
  setProjects: PropTypes.func,
  user: PropTypes.any,
};

export default ProjectCard;
