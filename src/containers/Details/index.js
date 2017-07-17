import React, { Component } from "react";
import { connect } from "react-redux";
import CollectionMoviesList from "./components/CollectionMoviesList";
import DetailsComponent from "./components/DetailsComponent";
import RecommendedmoviesList from "./components/RecommendedMoviesList";
import { getMovieDetailsAsync, closeMovieDetails, getMovieCollectionAsync, getRecommendationsAsync, getGenresAsync } from "../../actions/moviesActions";

class Details extends Component{

  componentDidMount() {
    const { getMovieDetailsAsync, match, getMovieCollectionAsync, getRecommendationsAsync, genresList, getGenresAsync } = this.props;
    if(!genresList.length) {
      getGenresAsync();
    }
    getMovieDetailsAsync(match.params.id)
      .then(result => {
        if(result.belongs_to_collection) {
          getMovieCollectionAsync(result.belongs_to_collection.id);
        }
        getRecommendationsAsync(result.id, 1);
      });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      const { getMovieDetailsAsync, getMovieCollectionAsync, getRecommendationsAsync } = this.props;
      getMovieDetailsAsync(nextProps.match.params.id)
        .then(result => {
          if(result.belongs_to_collection) {
            getMovieCollectionAsync(result.belongs_to_collection.id);
          }
          getRecommendationsAsync(result.id, 1);
        });
    }
  }

  componentWillUnmount() {
    this.props.closeMovieDetails();
  }

  render() {
    const { movieDetails, collectionList, movieRecommendationsList, getRecommendationsAsync } = this.props;
    console.log("DETAILS", movieDetails);
    console.log("COLLECTION", collectionList);
    console.log("RECOMMENDATIONS", movieRecommendationsList);
    return (
      <div>
        <DetailsComponent/>
        <CollectionMoviesList
          collectionList={collectionList}
        />
        <RecommendedmoviesList
          recommendedMoviesList={movieRecommendationsList}
          getRecommendedAsync={getRecommendationsAsync}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let collectionList = [];
  let recommendationList = [];
  const genresList = state.movies.genresList;
  if(state.movies.movieCollection.parts && genresList.length) {
    collectionList = state.movies.movieCollection.parts.map(movie => {
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
  if(state.movies.movieRecommendationsList.results && genresList.length) {
    recommendationList = state.movies.movieRecommendationsList.results.map(movie => {
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
    movieDetails: state.movies.movieDetails,
    collectionList,
    genresList,
    movieRecommendationsList: {
      ...state.movies.movieRecommendationsList,
      ...{
        results: recommendationList
      }
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieDetailsAsync: (id) => dispatch(getMovieDetailsAsync(id)),
    closeMovieDetails: () => dispatch(closeMovieDetails),
    getMovieCollectionAsync: (id) => dispatch(getMovieCollectionAsync(id)),
    getRecommendationsAsync: (id, page) => dispatch(getRecommendationsAsync(id, page)),
    getGenresAsync: () => dispatch(getGenresAsync())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);