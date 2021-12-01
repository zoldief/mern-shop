import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { createRating } from '../http/ratingAPI';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [rating, setRating] = useState([]);
  const [rate, setRate] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      setDevice(data.device);
      setRating(data.rating);
    });
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              {rating.length ? Math.round(rating.map((ratingObj) => ratingObj.rate).reduce((a, b) => a + b) / rating.length) : 0}
            </div>
            <input type="number" onChange={(e) => setRate(Number(e.value))} />
            <Button onChange={createRating({ userId: 1, deviceId: device.id, rate })} variant={'outline-dark'}>
              Set rate
            </Button>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>{device.price}$.</h3>
            <Button variant={'outline-dark'}>Add to basket</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Info</h1>
        {device.info.map((info, index) => (
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
