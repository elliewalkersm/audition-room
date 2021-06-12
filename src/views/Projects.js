import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import { SiAddthis } from 'react-icons/si';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../helpers/data/ProjectData';
import AddProjectForm from '../components/AddProjectForm';

function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [addButton, setAddButton] = useState(false);

  const handleAddButton = () => {
    setAddButton((prevState) => !prevState);
  };

  useEffect(() => {
    getProjects(user.uid).then((response) => setProjects(response));
  }, []);

  return (
    <div>
      <h2 className="project-header mt-3">Projects</h2>
      <Container className="themed-container icons-header mt-5" fluid={true}>
        <Row>
          <Col xs="6" className="icons-right d-flex justify-content-end">
            <i className="fas fa-align-center filter-icon body-icons"></i>
              { !addButton
                ? <Button className="m-2 btn-lg justify-content-center" onClick={handleAddButton}><SiAddthis/></Button>
                : <div>
                <Button className="m-2 btn-lg" color='secondary' onClick={handleAddButton}>Close</Button>
                  <AddProjectForm className="justify-content-center mt-3" setProjects={setProjects} projects={projects} user={user}/>
                </div>
                }
          </Col>
        </Row>
      </Container>
      <div className="project-container d-flex w-100 flex-row justify-content-start">
        {projects.map((projectsInfo) => (
          <ProjectCard
            key={projectsInfo.firebaseKey}
            {...projectsInfo}
            setProjects={setProjects}
            user={user}
          />
        ))}
      </div>
      <div className="projects-view">
      </div>
    </div>
  );
}

Projects.propTypes = {
  user: PropTypes.any,
  projectsInfo: PropTypes.object,
  projects: PropTypes.array,
  setProjects: PropTypes.func,
};

export default Projects;
