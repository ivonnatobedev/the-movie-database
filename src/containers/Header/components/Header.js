import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../config/config";

const Header = () => {
  return (
    <header>
      <Row>
        <Col md={1}>
          <Link to="/">
            <img src="https://www.themoviedb.org/assets/static_cache/41bdcf10bbf6f84c0fc73f27b2180b95/images/v4/logos/91x81.png" alt="the movie db"/>
          </Link>
        </Col>
        <Col md={6} style={{"marginLeft": "14px"}}>
          <h1>
            {config.APP_NAME}
          </h1>
        </Col>
      </Row>
    </header>
  );
};

export default Header;