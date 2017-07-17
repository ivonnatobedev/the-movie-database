import * as types from "../constants/actionTypes";
import axios from "../config/network";
import config from "../config/config";

function searchMovies(list) {
  return {
    type: types.SEARCH_MOVIES,
    payload: list
  };
}

export function clearSearchResult() {
  return {
    type: types.CLEAR_SEARCH_RESULT
  };
}

function getGenres(list) {
  return {
    type: types.GET_ALL_GENRES,
    payload: list
  };
}

function getPopularMovies(list) {
  return {
    type: types.GET_POPULAR_MOVIES,
    payload: list
  };
}

function getUpcoming(list) {
  return {
    type: types.GET_UPCOMING,
    payload: list
  };
}

function openMovieDetails(movie) {
  return {
    type: types.OPEN_MOVIE_DETAILS,
    payload: movie
  };
}

export function closeMovieDetails() {
  return {
    type: types.CLOSE_MOVIE_DETAILS
  };
}

function getMovieCollection(collection) {
  return {
    type: types.GET_MOVIE_COLLECTION,
    payload: collection
  };
}

function getRecommendations(recommendations) {
  return {
    type: types.GET_RECOMMENDATIONS,
    payload: recommendations
  };
}

const getMovieCredits = credits => {
  return {
    type: types.GET_MOVIE_CREDITS,
    credits
  };
};

export function searchMoviesAsync(query) {
  return dispatch => {
    axios.get(`search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}&query=${query}`)
      .then(result => {
        dispatch(searchMovies(result.data.results));
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };
}

export function getGenresAsync() {
  return dispatch => {
    axios.get(`genre/list?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`)
      .then(result => {
        dispatch(getGenres(result.data.genres));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
}

export function getPopularMoviesAsync(page) {
  return dispatch => {
    axios.get(`movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}&page=${page}`)
      .then(result => {
        dispatch(getPopularMovies(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
}

export function getUpcomingAsync(page) {
  return dispatch => {
    axios.get(`movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}&page=${page}`)
      .then(result => {
        dispatch(getUpcoming(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
}

export function getMovieDetailsAsync(id) {
  return dispatch => {
    return axios.get(`movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`)
     .then(result => {
       dispatch(openMovieDetails(result.data));
       return result.data;
     })
     .catch(e => {
       console.log("ERROR", e);
     });
  };
}

export function getMovieCollectionAsync(id) {
  return dispatch => {
    axios.get(`collection/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`)
      .then(result => {
        dispatch(getMovieCollection(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
}

export function getRecommendationsAsync(id, page) {
  return dispatch => {
    axios.get(`movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}$page=${page}`)
    .then(result => {
      dispatch(getRecommendations(result.data));
    })
    .catch(e => {
      console.log("ERROR", e);
    });
  };
}

export const getMovieCreditsAsync = id => {
  return dispatch => {
    axios.get(`movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`)
      .then(result => {
        dispatch(getMovieCredits(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
};


