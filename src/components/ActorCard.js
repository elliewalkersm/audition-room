import React, { useState } from 'react';
import {
  CardBody,
  CardTitle,
  Button,
  Card,
  CardSubtitle,
  CardImg
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteActor } from '../helpers/data/ActorData';
import AddActorForm from './AddActorForm';

const ActorCard = ({
  user,
  setActors,
  ...actorsInfo
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'delete':
        deleteActor(actorsInfo.firebaseKey, user.uid).then((response) => setActors(response));
        break;
      default:
        console.warn('Nothing Selected');
    }
  };

  return (
    <Card className="project-card">
    <CardBody>
      <CardTitle className="card-title mt-4 mb-3" tag="h5">{actorsInfo.name}</CardTitle>
      <CardSubtitle className="card-text mb-4" >{actorsInfo.location}</CardSubtitle>
      <CardSubtitle className="card-text mb-4" >{actorsInfo.production}</CardSubtitle>
      <CardSubtitle className="card-text mb-4" >{actorsInfo.character}</CardSubtitle>
      <CardImg src="https://static.wikia.nocookie.net/hamiltonmusical/images/a/a6/Lin-Manuel_Miranda_Pic.jpg/revision/latest?cb=20200802085805"/>
      <Button color="primary" size="sm">Resume</Button>
      <hr></hr>
      <Button color="light" size="sm" onClick={() => handleClick('delete')}><i className="fas fa-trash"></i></Button>
      <Button color="light" size="sm" onClick={() => handleClick('edit')}>
        { editing ? 'Close Form' : 'Edit project'}
     </Button>
      {
        editing && <AddActorForm
          formTitle='Edit Actor'
          {...actorsInfo}
          setActors={setActors}
          user={user}
        />
      }
    </CardBody>
    </Card>
  );
};

ActorCard.propTypes = {
  actorsInfo: PropTypes.object,
  setActors: PropTypes.func,
  user: PropTypes.any,
};

export default ActorCard;
