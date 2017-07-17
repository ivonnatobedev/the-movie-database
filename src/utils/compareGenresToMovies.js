export default (genresList, moviesList) => {
   let result = moviesList.map(movie => {
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
  return result;
}