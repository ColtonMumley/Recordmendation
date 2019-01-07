import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Layout.css";

import Recommendation from "./Recommendation/Recommendation";
import NowPlaying from "../components/NowPlaying";

class Layout extends Component {
  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col md={3}>
              <NowPlaying />
            </Col>
            <Col md={9}>
              <Recommendation />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Layout;
