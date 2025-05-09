import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

function Services() {
  const services = [
    {
      title: 'Job Matching',
      description: 'Find the perfect job that matches your skills and qualifications.',
      price: 'Free for job seekers',
    },
    {
      title: 'Professional Consulting',
      description: 'Get expert advice from industry professionals on career growth.',
      price: '€100 per hour',
    },
    {
      title: 'Home Maintenance',
      description: 'On-demand home repair services including plumbing, electrical, and more.',
      price: '€30 per hour',
    },
    {
      title: 'Freelance Projects',
      description: 'Hire top-rated freelancers for your project needs.',
      price: 'Prices vary by project',
    },
  ];

  return (
    <Container className="mt-5">
      <h1>Our Services</h1>
      <Row>
        {services.map((service, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>
                  {service.description}
                  <br />
                  <strong>{service.price}</strong>
                </Card.Text>
                <Button variant="primary">Inquire Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Services;
