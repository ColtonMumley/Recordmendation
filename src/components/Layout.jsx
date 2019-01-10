import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Layout.css";

import Recommendation from "./Recommendation/Recommendation";
import Masthead from "./Masthead";

class Layout extends Component {
  render() {
    return (
      <div>
        <Masthead />
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <Recommendation />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Layout;
