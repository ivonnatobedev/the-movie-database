import * as types from "../constants/actionTypes";
import axios from "../config/network";
import config from "../config/config";

const searchMovies = list => {
  return {
    type: types.SEARCH_MOVIES,
    payload: list
  };
};

export const clearSearchResult = () => {
  return {
    type: types.CLEAR_SEARCH_RESULT
  };
};

const getGenres = list => {
  return {
    type: types.GET_ALL_GENRES,
    payload: list
  };
};

const getPopularMovies = list => {
  return {
    type: types.GET_POPULAR_MOVIES,
    payload: list
  };
};

const getUpcoming = list => {
  return {
    type: types.GET_UPCOMING,
    payload: list
  };
};

const openMovieDetails = movie => {
  return {
    type: types.OPEN_MOVIE_DETAILS,
    payload: movie
  };
};

export const closeMovieDetails = () => {
  return {
    type: types.CLOSE_MOVIE_DETAILS
  };
};

const getMovieCollection = collection => {
  return {
    type: types.GET_MOVIE_COLLECTION,
    payload: collection
  };
};

const getRecommendations = recommendations => {
  return {
    type: types.GET_RECOMMENDATIONS,
    payload: recommendations
  };
};

const getMovieCredits = credits => {
  return {
    type: types.GET_MOVIE_CREDITS,
    credits
  };
};

export const searchMoviesAsync = query => {
  return dispatch => {
    axios.get(`search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}&query=${query}`)
      .then(result => {
        dispatch(searchMovies(result.data.results));
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };
};

export const getGenresAsync = () => {
  return dispatch => {
    axios.get(`genre/list?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`)
      .then(result => {
        dispatch(getGenres(result.data.genres));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
};

export const getPopularMoviesAsync = page => {
  return dispatch => {
    axios.get(`movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}&page=${page}`)
      .then(result => {
        dispatch(getPopularMovies(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
};

export const getUpcomingAsync = page => {
  return dispatch => {
    axios.get(`movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}&page=${page}`)
      .then(result => {
        dispatch(getUpcoming(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
};

export const getMovieCollectionAsync = id => {
  return dispatch => {
    axios.get(`collection/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`)
      .then(result => {
        dispatch(getMovieCollection(result.data));
      })
      .catch(e => {
        console.log("ERROR", e);
      });
  };
};

export const getRecommendationsAsync = (id, page) => {
  return dispatch => {
    axios.get(`movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}$page=${page}`)
    .then(result => {
      dispatch(getRecommendations(result.data));
    })
    .catch(e => {
      console.log("ERROR", e);
    });
  };
};

export const getAllMovieDetails = (id, page) => {
  return dispatch => {
    axios.all([
      axios.get(`movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`),
      axios.get(`movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}`),
      axios.get(`movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${config.data_language}$page=${page}`)
    ])
      .then(axios.spread(function (...args) {
        dispatch(openMovieDetails(args[0].data));
        dispatch(getMovieCredits(args[1].data));
        dispatch(getRecommendations(args[2].data));
        if(args[0].data.belongs_to_collection) {
          dispatch(getMovieCollectionAsync(args[0].data.belongs_to_collection.id));
        }
      }))
      .catch(e => {
        console.log("ERROR", e);
      });
  };
};


