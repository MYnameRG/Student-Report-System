import React from 'react';
import { Container, Navbar, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StudentLogo from './assets/student.ico';
import EnterRecord from './assets/writing.png';
import Leaderboard from './assets/podium.png';
import Marks from './Marks';
import Result from './Result';
import './App.css';
import { Fragment } from 'react';

function App() {

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#" style={{ "padding": "10px" }}>
          <img
            alt=""
            src={StudentLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '} Student Ranking System
        </Navbar.Brand>
      </Navbar>

      <Container fluid>
        <Row>

          <Col className="links" sm={3}>
            <h4><img
              alt=""
              src={EnterRecord}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} <Link style={{ "textDecoration": "none", "color": "black" }} to="/marks">Enter Marks Records</Link></h4>

            <h4><img
              alt=""
              src={Leaderboard}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} <Link style={{ "textDecoration": "none", "color": "black" }} to="/records">View Leaderboard</Link></h4>
          </Col>

          <Col className="content" sm={9}>
            <Switch>
              <Route exact path="/">
                <Fragment>
                  <Jumbotron>
                    <h1>Welcome To Student Report System!</h1>
                    <p>
                      This is a simple report system for the teacher to 
                      know more about student rank as well as marksheet.</p>
                    <p>
                      <Button variant="primary">
                        <Link style={{ "textDecoration": "none", "color": "white" }} to="/marks">Continue</Link>
                      </Button>
                    </p>
                  </Jumbotron>
                </Fragment>
              </Route>
              <Route exact path="/marks">
                <Marks />
              </Route>
              <Route exact path="/records">
                <Result />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
