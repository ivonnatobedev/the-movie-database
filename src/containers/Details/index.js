import React, { Component } from "react";
import { connect } from "react-redux";
import CollectionMoviesList from "./components/CollectionMoviesList";
import DetailsComponent from "./components/DetailsComponent";
import RecommendedMoviesList from "./components/RecommendedMoviesList";
import { closeMovieDetails, getRecommendationsAsync, getGenresAsync, getAllMovieDetails } from "../../actions/moviesActions";
import compareGenresToMovie from "../../utils/compareGenresToMovies";
import PropTypes from "prop-types";

class Details extends Component{

  componentDidMount() {
    const { match, genresList, getGenresAsync, getAllMovieDetails } = this.props;
    if(!genresList.length) {
      getGenresAsync();
    }
    getAllMovieDetails(match.params.id, 1);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      const { getAllMovieDetails } = this.props;
      this.props.closeMovieDetails();
      getAllMovieDetails(nextProps.match.params.id, 1);
    }
  }

  componentWillUnmount() {
    this.props.closeMovieDetails();
  }

  render() {
    const { movieDetails, collectionList, movieRecommendationsList, getRecommendationsAsync, movieCredits } = this.props;
    return (
      <div>
        <DetailsComponent
          movieDetails={movieDetails}
          movieCredits={movieCredits}
        />
        <CollectionMoviesList
          collectionList={collectionList}
        />
        <RecommendedMoviesList
          recommendedMoviesList={movieRecommendationsList}
          getRecommendedAsync={getRecommendationsAsync}
        />
      </div>
    );
  }
}

Details.propTypes = {
  movieDetails: PropTypes.object,
  collectionList: PropTypes.array,
  genresList: PropTypes.array,
  movieRecommendationsList: PropTypes.object,
  movieCredits: PropTypes.object,
  closeMovieDetails: PropTypes.func,
  getRecommendationsAsync: PropTypes.func,
  getAllMovieDetails: PropTypes.func,
  getGenresAsync: PropTypes.func
};

const mapStateToProps = state => {
  let collectionList = [];
  let recommendationList = [];
  const genresList = state.movies.genresList;
  if(state.movies.movieCollection.parts && genresList.length) {
    collectionList = compareGenresToMovie(genresList, state.movies.movieCollection.parts);
  }
  if(state.movies.movieRecommendationsList.results && genresList.length) {
    recommendationList = compareGenresToMovie(genresList, state.movies.movieRecommendationsList.results);
  }

  return {
    movieDetails: state.movies.movieDetails,
    collectionList,
    genresList,
    movieRecommendationsList: {
      ...state.movies.movieRecommendationsList,
      ...{
        results: recommendationList
      }
    },
    movieCredits: state.movies.movieCredits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMovieDetails: () => dispatch(closeMovieDetails()),
    getRecommendationsAsync: (id, page) => dispatch(getRecommendationsAsync(id, page)),
    getAllMovieDetails: (id, page) => dispatch(getAllMovieDetails(id, page)),
    getGenresAsync: () => dispatch(getGenresAsync())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);