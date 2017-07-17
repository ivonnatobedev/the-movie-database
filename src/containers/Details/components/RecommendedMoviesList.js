import React from "react";
import { Pagination, Panel } from "react-bootstrap";
import MovieListItem from "../../Home/components/MovieListItem";

const RecommendedMoviesList = ({recommendedMoviesList, getRecommendedAsync}) => {

  function paginationHandler(eventKey) {
    getRecommendedAsync(eventKey);
  }

  let list = recommendedMoviesList.results ? recommendedMoviesList.results : [];

  return (
    <section className="popular-list">
      <Panel header="Рекомендованные">
        {
          list.map(movie => {
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
          items={recommendedMoviesList.total_pages || 0}
          maxButtons={5}
          activePage={recommendedMoviesList.page || 0}
          onSelect={paginationHandler}
        />
      </Panel>
    </section>
  );
};

export default RecommendedMoviesList;