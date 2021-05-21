import React, { Fragment, useState, useRef } from 'react';
import { Container, Form, Col, InputGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Marks.css';

export default function Marks() {
  const marks = {
    first_name: useRef(null),
    last_name: useRef(null),
    roll_no: useRef(null),
    math: useRef(null),
    chemistry: useRef(null),
    physics: useRef(null),
    total: useRef(null),
    percentage: useRef(null)
  };

  const [validated, setValidated] = useState(false);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    const data = {
      fname: marks.first_name.current.value,
      lname: marks.last_name.current.value,
      rollno: marks.roll_no.current.value,
      math: marks.math.current.value,
      physics: marks.physics.current.value,
      chemistry: marks.chemistry.current.value,
      total: marks.total.current.value,
      percent: marks.percentage.current.value
    };

    axios
      .post("http://localhost:2000/students", data)
      .then((data) => {
        setData(data);
        setShow(true);
      }).catch((error) => {
        if (error) console.log(error);
      });

    e.preventDefault();
  };

  const handleChange = () => {
    const total = parseInt(marks.math.current.value === "" ? 0 : marks.math.current.value) +
      parseInt(marks.chemistry.current.value === "" ? 0 : marks.chemistry.current.value) +
      parseInt(marks.physics.current.value === "" ? 0 : marks.physics.current.value);
    setTotal(total);
    setPercentage(total * 100 / 300);
  };

  return (
    <Fragment>
      { show === true && <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{data.data.success}</Alert.Heading>
        <p>Your Data is stored...</p>
      </Alert>}

      <div className="heading">
        <Container>
          <h1>Enter Marks Details</h1>
          <p>
            Enter your marks of given subject with full details....
          </p>
        </Container>
      </div>

      <div className="form">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01" className="form-data">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                ref={marks.first_name}
                type="text"
                placeholder="First name"
                name="fname"
              />
              <Form.Control.Feedback type="invalid">Please Enter a First Name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02" className="form-data">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                ref={marks.last_name}
                name="lname"
              />
              <Form.Control.Feedback type="invalid">Please Enter a Last Name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustomUsername" className="form-data">
              <Form.Label>Roll Number</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Roll Number"
                  name="rollno"
                  ref={marks.roll_no}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter a Number
            </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="2" controlId="validationCustom03" className="form-data">
              <Form.Label>Marks Of Math (out of 100)</Form.Label>
              <Form.Control type="text" placeholder="Marks" name="math" ref={marks.math} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please Enter a Number
          </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom04" className="form-data">
              <Form.Label>Marks of Chemistry (out of 100)</Form.Label>
              <Form.Control type="text" placeholder="Marks" name="chemistry" ref={marks.chemistry} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please Enter a Number
          </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="validationCustom05" className="form-data">
              <Form.Label>Marks Of Physics (out of 100)</Form.Label>
              <Form.Control type="text" placeholder="Marks" name="physics" ref={marks.physics} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please Enter a Number
          </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="validationCustom05" className="form-data">
              <Form.Label>Total (out of 300)</Form.Label>
              <Form.Control type="text" required disabled name="total" ref={marks.total} value={total} />
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="validationCustom05" className="form-data">
              <Form.Label>Percentage</Form.Label>
              <Form.Control type="text" required disabled name="percentage" ref={marks.percentage} value={percentage} />
            </Form.Group>
          </Form.Row>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </Fragment>
  );
}


