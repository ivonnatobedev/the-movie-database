import React from "react";
import { Collapse, ListGroup, ListGroupItem, Panel, Row, Col, Label, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../config/config";

const ListItem = ({ movie }) => {

  let imgUrl = movie.poster_path
    ?
  `${config.IMAGE_HOST_SMALL}${movie.poster_path}`
    :
  `${config.IMAGE_PLACEHOLDER_SMALL}`;

  return (
    <ListGroupItem>
      <Link to={`/${movie.id}`}>
        <Row>
          <Col md={4}>
            <Image src={imgUrl} alt={movie.title} thumbnail/>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <span>
                  {movie.title ? movie.title : movie.name}
                </span>
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
          </Col>
        </Row>
      </Link>
    </ListGroupItem>
  );
};

const SearchList = ({searchList}) => {
  return (
    <Collapse in={!!searchList.length} className="search-list">
      <Panel header="Search results">
        <ListGroup>
          {
            searchList.map( movie => {
              return (
                <ListItem
                  movie={movie}
                  key={movie.id}
                />
              );
            })
          }
        </ListGroup>
      </Panel>
    </Collapse>
  );
};

export default SearchList;