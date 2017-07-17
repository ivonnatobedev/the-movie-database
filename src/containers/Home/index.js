import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import SearchList from "./components/SearchList";
import PopularList from "./components/PopularList";
import UpcomingReleasesList from "./components/UpcomingReleasesList";
import { connect } from "react-redux";
import * as moviesActions from "../../actions/moviesActions";

class Home extends Component {

  componentDidMount() {
    const { genresList, getGenresAsync, popularMoviesList, getPopularMoviesAsync, upcomingList, getUpcomingAsync } = this.props;
    if(!genresList.length) {
      getGenresAsync();
    }
    if(!popularMoviesList.length) {
      getPopularMoviesAsync(1);
    }
    if(!upcomingList.length) {
      getUpcomingAsync(1);
    }
  }

  render() {
    const { searchList, searchMoviesAsync, clearSearchResult, popularMoviesList, getPopularMoviesAsync, upcomingList, getUpcomingAsync } = this.props;
    return (
      <div>
        <SearchBar
          searchMoviesAsync={searchMoviesAsync}
          clearSearchResult={clearSearchResult}
        />
        <SearchList
          searchList={searchList}
        />
        <PopularList
          popularMoviesList={popularMoviesList}
          getPopularMoviesAsync={getPopularMoviesAsync}
        />
        <UpcomingReleasesList
          upcomingList={upcomingList}
          getUpcomingAsync={getUpcomingAsync}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const genresList = state.movies.genresList;

  let searchList = state.movies.searchList.map(movie => {
    let genres = [];
    movie.genre_ids.forEach(genre => {
      let gnr = genresList.find(gen => genre === gen.id);
      if(gnr) {
        genres.push(gnr);
      }
    });
    return {
      ...movie,
      ...{
        genres: genres
      }
    };
  });

  let popularList = [];
  if(state.movies.popularMoviesList.results && genresList.length) {
    popularList = state.movies.popularMoviesList.results.map(movie => {
      let genres = [];
      movie.genre_ids.forEach(genre => {
        let gnr = genresList.find(gen => genre === gen.id);
        if(gnr) {
          genres.push(gnr);
        }
      });
      return {
        ...movie,
        ...{
          genres: genres
        }
      };
    });
  }

  let upcomingList = [];
  if(state.movies.upcomingList.results && genresList.length) {
    upcomingList = state.movies.upcomingList.results.map(movie => {
      let genres = [];
      movie.genre_ids.forEach(genre => {
        let gnr = genresList.find(gen => genre === gen.id);
        if(gnr) {
          genres.push(gnr);
        }
      });
      return {
        ...movie,
        ...{
          genres: genres
        }
      };
    });
  }

  return {
    searchList,
    genresList,
    popularMoviesList: {
      ...state.movies.popularMoviesList,
      ...{
        results: popularList
      }
    },
    upcomingList: {
      ...state.movies.upcomingList,
      ...{
        results: upcomingList
      }
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchMoviesAsync: (query) => dispatch(moviesActions.searchMoviesAsync(query)),
    clearSearchResult: (query) => dispatch(moviesActions.clearSearchResult()),
    getGenresAsync: () => dispatch(moviesActions.getGenresAsync()),
    getPopularMoviesAsync: (page) => dispatch(moviesActions.getPopularMoviesAsync(page)),
    getUpcomingAsync: (page) => dispatch(moviesActions.getUpcomingAsync(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);