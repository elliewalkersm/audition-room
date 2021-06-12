import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import { SiAddthis } from 'react-icons/si';
import { TiFilter } from 'react-icons/ti';
import ActorCard from '../components/ActorCard';
import { getActors } from '../helpers/data/ActorData';
import AddActorForm from '../components/AddActorForm';

function Actors({ user }) {
  const [actors, setActors] = useState([]);
  const [addActorButton, setAddActorButton] = useState(false);

  const handleAddActorButton = () => {
    setAddActorButton((prevState) => !prevState);
  };

  useEffect(() => {
    getActors(user.uid).then((response) => setActors(response));
  }, []);

  return (
    <div>
      <h2 className="actor-header mt-3">Actors</h2>
      <Container className="themed-container icons-header mt-5" fluid={true}>
        <Row>
          <Col xs="6" className="icons-right d-flex justify-content-end">
          <Button><TiFilter/></Button>
              { !addActorButton
                ? <Button className="m-2 btn-lg justify-content-center" onClick={handleAddActorButton}><SiAddthis/></Button>
                : <div>
                <Button className="m-2 btn-lg" color='secondary' onClick={handleAddActorButton}>Close</Button>
                  <AddActorForm className="justify-content-center mt-3" setActors={setActors} actors={actors} user={user}/>
                </div>
                }
          </Col>
        </Row>
      </Container>
      <div className="actor-container d-flex w-100 flex-row justify-content-start">
        {actors.map((actorsInfo) => (
          <ActorCard
            key={actorsInfo.firebaseKey}
            {...actorsInfo}
            setActors={setActors}
            user={user}
          />
        ))}
      </div>
      <div className="actors-view">
      </div>
    </div>
  );
}

Actors.propTypes = {
  user: PropTypes.any,
  actorsInfo: PropTypes.object,
  actors: PropTypes.array,
  setActors: PropTypes.func,
};

export default Actors;
