import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { addActor, updateActor } from '../helpers/data/ActorData';

function AddActorForm({
  user, setActors, formTitle, ...actorInfo
}) {
  const [actor, setActor] = useState({
    name: actorInfo?.name || '',
    production: actorInfo?.production || '',
    character: actorInfo?.character || '',
    location: actorInfo?.location || '',
    notes: actorInfo?.notes || '',
    uid: user.uid,
    firebaseKey: actorInfo?.firebaseKey || null
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setActor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actor.firebaseKey) {
      updateActor(actor, user.uid).then((actorsArray) => {
        setActors(actorsArray);
        history.push('/actors');
      });
    } else {
      addActor(actor, user.uid).then((response) => {
        setActors(response);
        history.push('/actors');
      });
    }
  };

  return (
    <div className="actor-form-container mt-5">
      <Form
        className='actor-input-form'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <Label></Label>
        <Input
          name='name'
          type='text'
          placeholder='Full Name'
          value={actor.name}
          onChange={handleInputChange}
        >
        </Input>
        <Label></Label>
        <Input
          name='production'
          type='text'
          placeholder='production'
          value={actor.production}
          onChange={handleInputChange}
        >
        </Input>
        <Label></Label>
        <Input
          name='character'
          type='text'
          placeholder='character'
          value={actor.character}
          onChange={handleInputChange}>
        </Input>
        <Input
          name='location'
          type='text'
          placeholder='location'
          value={actor.location}
          onChange={handleInputChange}>
        </Input>
        <Input
          name='notes'
          type='text'
          placeholder='notes'
          value={actor.notes}
          onChange={handleInputChange}>
        </Input>
        <Button className="project-form-submit-btn mt-4" color='success' size="sm" type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

AddActorForm.propTypes = {
  user: PropTypes.any,
  formTitle: PropTypes.string.isRequired,
  actorInfo: PropTypes.object,
  setActors: PropTypes.func,
};

export default AddActorForm;
