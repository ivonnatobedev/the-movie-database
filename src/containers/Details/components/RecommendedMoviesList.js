import React from "react";
import { Pagination, Panel } from "react-bootstrap";
import MovieListItem from "../../Home/components/MovieListItem";

const PaginationComponent = ({list, handler}) => {
  if(list.total_pages > 1) {
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={list.total_pages || 0}
        maxButtons={5}
        activePage={list.page || 0}
        onSelect={handler}
      />
    );
  } else {
    return null;
  }
};

const RecommendedMoviesList = ({recommendedMoviesList, getRecommendedAsync}) => {

  const paginationHandler = eventKey => {
    getRecommendedAsync(eventKey);
  };

  if(recommendedMoviesList.results.length) {
    return (
      <section className="popular-list">
        <Panel header="Рекомендованные">
          {
            recommendedMoviesList.results.map(movie => {
              return (
                <MovieListItem
                  key={movie.id}
                  movie={movie}
                />
              );
            })
          }
          <PaginationComponent
            list={recommendedMoviesList}
            handler={paginationHandler}
          />
        </Panel>
      </section>
    );
  } else {
    return null;
  }
};

export default RecommendedMoviesList;