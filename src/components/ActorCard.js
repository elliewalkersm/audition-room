import React from 'react';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';

export default function ActorCard() {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Name</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Production</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Character</CardSubtitle>
        </CardBody>
        <img width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardText>Notes</CardText>
          <CardLink href="#">Resume</CardLink>
        </CardBody>
      </Card>
    </div>
  );
}
