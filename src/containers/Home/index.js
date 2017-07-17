import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import SearchList from "./components/SearchList";
import PopularList from "./components/PopularList";
import UpcomingReleasesList from "./components/UpcomingReleasesList";
import { connect } from "react-redux";
import * as moviesActions from "../../actions/moviesActions";
import compareGenresToMovie from "../../utils/compareGenresToMovies";
import PropTypes from "prop-types";

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

  componentWillUnmount() {
    this.props.clearSearchResult();
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

Home.propTypes = {
  searchList: PropTypes.array,
  genresList: PropTypes.array,
  popularMoviesList: PropTypes.object,
  upcomingList: PropTypes.object,
  searchMoviesAsync: PropTypes.func,
  clearSearchResult: PropTypes.func,
  getGenresAsync: PropTypes.func,
  getPopularMoviesAsync: PropTypes.func,
  getUpcomingAsync: PropTypes.func
};

const mapStateToProps = state => {
  const genresList = state.movies.genresList;
  let popularList = [];
  let upcomingList = [];
  let searchList = compareGenresToMovie(genresList, state.movies.searchList);
  if(state.movies.popularMoviesList.results && genresList.length) {
    popularList = compareGenresToMovie(genresList, state.movies.popularMoviesList.results);
  }
  if(state.movies.upcomingList.results && genresList.length) {
    upcomingList = compareGenresToMovie(genresList, state.movies.upcomingList.results);
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