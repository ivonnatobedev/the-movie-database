import * as types from "../constants/actionTypes";

const initialState = {
  searchList: [],
  genresList: [],
  popularMoviesList: [],
  upcomingList: [],
  movieDetails: {},
  movieCollection: {},
  movieRecommendationsList: {},
  movieCredits: {}
};

export default function moviesReducer(state = initialState, action) {
  switch(action.type) {
    case types.SEARCH_MOVIES:
      return {
        ...state,
        ...{
          searchList: action.payload
        }
      };

    case types.CLEAR_SEARCH_RESULT:
      return {
        ...state,
        ...{
          searchList: []
        }
      };

    case types.GET_ALL_GENRES:
      return {
        ...state,
        ...{
          genresList: action.payload
        }
      };

    case types.GET_POPULAR_MOVIES:
      return {
        ...state,
        ...{
          popularMoviesList: action.payload
        }
      };

    case types.GET_UPCOMING:
      return {
        ...state,
        ...{
          upcomingList: action.payload
        }
      };

    case types.OPEN_MOVIE_DETAILS:
      return {
        ...state,
        ...{
          movieDetails: action.payload
        }
      };

    case types.CLOSE_MOVIE_DETAILS:
      return {
        ...state,
        ...{
          movieDetails: {},
          movieCollection: {},
          movieRecommendationsList: {},
          movieCredits: {}
        }
      };

    case types.GET_MOVIE_COLLECTION:
      return {
        ...state,
        ...{
          movieCollection: action.payload
        }
      };

    case types.GET_RECOMMENDATIONS:
      return {
        ...state,
        ...{
          movieRecommendationsList: action.payload
        }
      };

    case types.GET_MOVIE_CREDITS:
      return {
        ...state,
        ...{
          movieCredits: action.credits
        }
      };

    default:
      return state;
  }
}