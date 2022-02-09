const cleanData = (movie) => {
  let keys = Object.keys(movie)
  keys.forEach(key => {
    if(!movie[key] && movie[key] !== movie.tagline && movie[key] !== movie.description) {
      movie[key] = 'not available'
    } else if (!movie[key] && movie[key] === movie.overview) {
      movie[key] = 'description unavailable'
    } else if (movie[key] === movie.budget || movie[key] === movie.revenue) {
      movie[key] = `$ ${movie[key]}`
    } else if (movie[key] === movie.runtime) {
      movie[key] = `${movie[key]} minutes`
    } else if (movie[key] === movie.genres && movie.genres.length === 0) {
      movie.genres.push('not available')
    }
  })
  return movie
}

const cleanAllData = (movies) => {
  return movies.filter(movie => {
    if(movie.poster_path && movie.title && movie.average_rating){
      return movie
    }
  })
}


const api = {

  get(path) {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`)
      .then(response => {
        if (!response.ok) {
          throw (`${response.status} ${response.statusText}. Please reload the page and try again!`);
        }
        return response.json()
      })
  },


  getSingleMovie(id) {
    return api.get(`movies/${id}`)
    .then(data => {
      return cleanData(data.movie)
    })
  },

  getAllMovies() {
    return api.get('movies')
    .then(data => {
      return cleanAllData(data.movies)
    })
  }

};



// Things that may be missing:
// - [ ] runtime
// - [ ] revenue
// - [ ] budget
// - [ ] poster photo
// - [ ] genre
// - [ ] description


// {"movie": {id: 1, title: "Fake Movie Title", poster_path: "https://image.tmdb.org/t/p/original//7G2VvG1lU8q758uOqU6z2Ds0qpA.jpg", backdrop_path: "https://image.tmdb.org/t/p/original//oazPqs1z78LcIOFslbKtJLGlueo.jpg", release_date: "2019-12-04", overview: "Some overview that is full of buzzwords to attempt to entice you to watch this movie! Explosions! Drama! True love! Robots! A cute dog!", average_rating: 6, genres: ["Drama"], budget:63000000, revenue:100853753, runtime:139, tagline: "It's a movie!" }}

export default api;
