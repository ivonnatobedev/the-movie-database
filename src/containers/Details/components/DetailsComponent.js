import React from "react";
import config from "../../../config/config";
import { Label, Tooltip, OverlayTrigger } from "react-bootstrap";


const ActorItem = ({actor}) => {
  if(!actor.profile_path) {
    return null;
  } else {
    let tooltip = <Tooltip id="tooltip">{actor.name}</Tooltip>;
    return(
      <li>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <img src={`${config.IMAGE_HOST_SMALL}${actor.profile_path}`} className="img img-thumbnail" alt={actor.name}/>
        </OverlayTrigger>
      </li>
    );
  }
};

const DetailsComponent = ({movieDetails, movieCredits}) => {

  let imageUrl = movieDetails.backdrop_path ? `${config.IMAGE_HOST_LARGE}${movieDetails.backdrop_path}` : config.IMAGE_HOST_LARGE;
  let actors = movieCredits.cast ? movieCredits.cast : [];
  let genres = movieDetails.genres ? movieDetails.genres : [];

  return (
    <div className="details">
      <div className="description">
        <div>
          <img src={imageUrl} style={{"width": "96%"}} alt={movieDetails.title ? movieDetails.title : movieDetails.name}/>
        </div>
        <h1>
          {movieDetails.title ? movieDetails.title : movieDetails.name}
        </h1>
        <small>
          {movieDetails.original_title}
        </small>
        <span style={{"marginLeft":"20px"}}>
          <i className="fa fa-calendar"/>&nbsp;
          {movieDetails.release_date}&nbsp;
        </span>
          <span style={{"marginLeft":"20px"}}>
          <i className="fa fa-star"/>&nbsp;
          {movieDetails.vote_average}&nbsp;
        </span>
          <span style={{"marginLeft":"20px"}}>
          <i className="fa fa-dollar"/>&nbsp;
          {movieDetails.budget}&nbsp;
        </span>
        <div className="genres-list">
          {
            genres.map(genre => {
              return (
                <Label key={genre.id}>
                  {genre.name}
                </Label>
              );
            })
          }
        </div>
        <div className="movie-overview">
          {movieDetails.overview}
        </div>
        <div className="actors">
          <h3>
            Актеры
          </h3>
          <ul className="list-inline">
            {
              actors.map(actor => {
                return (
                  <ActorItem
                    key={actor.id}
                    actor={actor}
                  />
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;