import React from "react";
import { Pagination, Panel } from "react-bootstrap";
import MovieListItem from "./MovieListItem";

const UpcomingReleases = ({upcomingList, getUpcomingAsync}) => {

  const paginationHandler = eventKey => {
    getUpcomingAsync(eventKey);
  };

  return (
    <section className="popular-list">
      <Panel header="Предстоящие">
        {
          upcomingList.results.map(movie => {
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
          items={upcomingList.total_pages}
          maxButtons={5}
          activePage={upcomingList.page}
          onSelect={paginationHandler}
        />
      </Panel>
    </section>
  );
};

export default UpcomingReleases;