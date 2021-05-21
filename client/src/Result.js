import React, { Fragment, useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import './Result.css';
import Filters from './assets/filters.png'

export default function Result() {
  const [datasheet, setDataSheet] = useState({});
  const [show, setShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    htl: false,
    lth: false,
    none: true
  });
  const [filterData, setFilterData] = useState([]);

  const handleGetResult = (e) => {
    axios
      .get("http://localhost:2000/results")
      .then((data) => {
        setLoading(true);
        setDataSheet(data);
        setShow(false);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  };

  const handleChange = (e) => {
    setFilterData(datasheet.data.success.data.filter((student) => student.name.includes(e.target.value)));
  }

  const handleFilters = (e) => {
    if (e.target.getAttribute("value") === "htl") {
      for (let i = 0; i < datasheet.data.success.data.length; i++) {
        for (let j = 0; j < datasheet.data.success.data.length - 1; j++) {
          if (datasheet.data.success.data[j].total < datasheet.data.success.data[j + 1].total) {
            const temp = datasheet.data.success.data[j];
            datasheet.data.success.data[j] = datasheet.data.success.data[j + 1];
            datasheet.data.success.data[j + 1] = temp;
          }
        }
      }
      setDataSheet(datasheet);
      setFilters({
        htl: true,
        lth: false,
        none: false
      });
    }
    else if (e.target.getAttribute("value") === "lth") {
      for (let i = 0; i < datasheet.data.success.data.length; i++) {
        for (let j = 0; j < datasheet.data.success.data.length - 1; j++) {
          if (datasheet.data.success.data[j].total > datasheet.data.success.data[j + 1].total) {
            const temp = datasheet.data.success.data[j];
            datasheet.data.success.data[j] = datasheet.data.success.data[j + 1];
            datasheet.data.success.data[j + 1] = temp;
          }
        }
      }
      setDataSheet(datasheet);
      setFilters({
        htl: false,
        lth: true,
        none: false
      });
    }
    else {
      axios
        .get("http://localhost:2000/results")
        .then((data) => {
          setDataSheet(data);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
      setFilters({
        htl: false,
        lth: false,
        none: true
      });
    }
  };

  return (
    <Fragment>
      <div className="functionality">
        <Container fluid>
          <Navbar bg="light" variant="light">
            <Nav className="mr-auto">
              <NavDropdown title="Filters" id="basic-nav-dropdown">
                <img src={Filters} alt="Filter"></img>
                <NavDropdown.Item disabled style={{ "color": "black" }}>Sort</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleFilters} value="htl">High to Low<sub className={filters.htl ? "clicked" : null}></sub></NavDropdown.Item>
                <NavDropdown.Item onClick={handleFilters} value="lth">Low to High<sub className={filters.lth ? "clicked" : null}></sub></NavDropdown.Item>
                <NavDropdown.Item onClick={handleFilters} value="none">None<sub className={filters.none ? "clicked" : null}></sub></NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" onChange={handleChange} className="mr-sm-2" />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </Navbar>
        </Container>
      </div>

      <div className="result">
        {
          filterData.length !== 0 ? Object.entries(datasheet).length > 0 && filterData.map((student, index) => {
            return (
              <div className="result-item" key={index}>
                <b>
                  <span className="name">{student.name}</span><br />
                  <span className="total">Total: {student.total}</span><br />
                  <span className="percentage">Percent: {student.percentage}%</span>
                </b>
              </div>
            );
          })
          : Object.entries(datasheet).length > 0 && datasheet.data.success.data.map((student, index) => {
            return (
              <div className="result-item" key={index}>
                <b>
                  <span className="name">{student.name}</span><br />
                  <span className="total">Total: {student.total}</span><br />
                  <span className="percentage">Percent: {student.percentage}%</span>
                </b>
              </div>
            );
          })
        }

        {
          show === true && <Button onClick={handleGetResult} sm="primary" className="result-button" disabled={isLoading}>{isLoading ? "Loading..." : "Get The Result"}</Button>
        }
      </div>
    </Fragment>
  );
}


