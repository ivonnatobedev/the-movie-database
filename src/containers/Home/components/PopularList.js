import React from "react";
import { Pagination, Panel } from "react-bootstrap";
import MovieListItem from "./MovieListItem";

const PopularList = ({popularMoviesList, getPopularMoviesAsync}) => {

  function paginationHandler(eventKey) {
    getPopularMoviesAsync(eventKey);
  }

  return (
    <section className="popular-list">
      <Panel header="Популярные">
        {
          popularMoviesList.results.map(movie => {
            return (
              <MovieListItem
                key={movie.id}
                movie={movie}
              />
            );
          })
        }
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={popularMoviesList.total_pages}
          maxButtons={5}
          activePage={popularMoviesList.page}
          onSelect={paginationHandler}
        />
      </Panel>
    </section>
  );
};

export default PopularList;