import React from 'react';
import {
  Card, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default function ProjectCard() {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
          <CardSubtitle>Venue</CardSubtitle>
          <CardSubtitle>Dates</CardSubtitle>
          <Button>Cast Details</Button>
        </CardBody>
      </Card>
    </div>
  );
}
