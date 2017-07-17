import React from "react";
import { Row, Col, Image, Label } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../config/config";

const MovieListItem = ({movie}) => {

  let imgUrl = movie.poster_path
    ?
  `${config.IMAGE_HOST_MEDIUM}${movie.poster_path}`
    :
  `${config.IMAGE_PLACEHOLDER_MEDIUM}`;

  return (
    <aticle className="movie-preview">
      <Row>
        <Col md={3}>
          <Image src={imgUrl} alt={movie.title} thumbnail/>
        </Col>
        <Col md={9}>
          <Row>
            <Col md={8}>
              <h3>
                {movie.title ? movie.title : movie.name}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <i className="fa fa-calendar"/>&nbsp;
              {movie.release_date}
            </Col>
            <Col md={6} style={{"textAlign": "right"}}>
              {movie.vote_average}&nbsp;
              <i className="fa fa-star"/>
            </Col>

          </Row>
          <Row>
            <Col md={12}>
              {
                movie.genres.map(genre => {
                  return (
                    <Label key={genre.id}>
                      {genre.name}
                    </Label>
                  );
                })
              }
            </Col>
          </Row>
          <Row>
            <Col md={12} className="movie-overview">
              {movie.overview}
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Link to={`/${movie.id}`}>
                Подробнее..
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </aticle>
  );
};

export default MovieListItem;
