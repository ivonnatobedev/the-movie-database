import React from "react";
import { Col, Row, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import { debounce } from "../../../utils/network";


const SearchBar = ({searchMoviesAsync, clearSearchResult}) => {

  const searchHandler = e => {
    if(e.target.value !== "") {
      debounce(searchMoviesAsync(e.target.value))
    } else {
      clearSearchResult();
    }
  };

  return (
    <Row className="search-bar">
      <Col md={12}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <i className="fa fa-search pull-right"/>
            </InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="search movie..."
              onChange={searchHandler}
            />
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;