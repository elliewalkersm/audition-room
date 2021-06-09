import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ProjectCard from '../components/ProjectCard';

function Projects({ user, projects, setProjects }) {
  return (
    <div>
      <h2 className="project-header mt-3">Projects</h2>
      <Container className="themed-container icons-header mt-5" fluid={true}>
        <Row>
          <Col xs="6" className="icons-right d-flex justify-content-end"><i className="fas fa-align-center filter-icon body-icons"></i><i className="fas fa-plus add-icon body-icons ml-4 mr-5"></i></Col>
        </Row>
      </Container>
      <div className="d-flex w-100 flex-row justify-content-start">
        {projects.map((projectInfo) => (
          <ProjectCard
            key={projectInfo.firebaseKey}
            {...projectInfo}
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
  projects: PropTypes.array,
  setProjects: PropTypes.func,
};

export default Projects;
