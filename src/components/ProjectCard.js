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
  ...projectInfo
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'delete':
        deleteProject(projectInfo.firebaseKey, user.uid).then((response) => setProjects(response));
        break;
      default:
        console.warn('Nothing Selected');
    }
  };

  const history = useHistory();

  const viewActors = () => {
    history.push(`/projects/${projectInfo.firebaseKey}`);
  };

  return (
    <Card className="project-card">
    <CardBody>
      <CardTitle className="card-title mt-4 mb-3" tag="h5">{projectInfo.title}</CardTitle>
      <CardSubtitle className="card-text mb-4" >{projectInfo.location}</CardSubtitle>
      <CardSubtitle className="card-text mb-4" >{projectInfo.venue}</CardSubtitle>
      <CardSubtitle className="card-text mb-4" >{projectInfo.dates}</CardSubtitle>
      <Button board-btn color="primary" size="sm" onClick={viewActors}>Cast Details</Button>
      <hr></hr>
      <Button project-btn color="light" size="sm" onClick={() => handleClick('delete')}><i className="fas fa-trash"></i></Button>
      <Button project-btn color="light" size="sm" onClick={() => handleClick('edit')}>
        { editing ? 'Close Form' : 'Edit project'}
     </Button>
      {
        editing && <AddProjectForm
          formTitle='Edit Project'
          {...projectInfo}
          setProjects={setProjects}
          user={user}
        />
      }
    </CardBody>
    </Card>
  );
};

ProjectCard.propTypes = {
  projectInfo: PropTypes.object,
  setProjects: PropTypes.func,
  user: PropTypes.any,
};

export default ProjectCard;
