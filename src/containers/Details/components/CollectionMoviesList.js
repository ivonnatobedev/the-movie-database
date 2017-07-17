import React from "react";
import { Panel } from "react-bootstrap";
import MovieListItem from "../../Home/components/MovieListItem";

const BelongsMoviesList = ({collectionList}) => {
  if(collectionList.length) {
    return (
      <section className="popular-list">
        <Panel header="Коллекция">
          {
            collectionList.map(movie => {
              return (
                <MovieListItem
                  key={movie.id}
                  movie={movie}
                />
              );
            })
          }
        </Panel>
      </section>
    );
  } else {
    return null;
  }
};

export default BelongsMoviesList;