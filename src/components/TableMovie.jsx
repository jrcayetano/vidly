import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Movie from './Movie';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';

class TableMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      headerTable: ['Title', 'Genre', 'Stock', 'Rate', 'liked', ''],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      selectedGenre: null
    };
  }

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deletMovieHandle = movie => {
    console.log('delete', movie);
    const movieList = [...this.state.movies];
    const movieListClear = movieList.filter(movieItem => movieItem !== movie);
    this.setState({ movies: movieListClear });
  };
  handleLike = movie => {
    let movieList = [...this.state.movies];
    movieList = movieList.map(movieItem => {
      if (movie === movieItem) movieItem['liked'] = !movieItem['liked'];
      return movieItem;
    });
    this.setState({ movies: movieList });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
    console.log('genre', genre);
  };

  render() {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres: allGenres,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    const movieMessage =
      filtered.length !== 0 ? (
        <p>Showing {filtered.length} movies in the database</p>
      ) : (
        <p>There is not movie on database</p>
      );

    return (
      <React.Fragment>
        {movieMessage}
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  {this.state.headerTable.map(header => (
                    <th scope="col" key={header}>
                      {' '}
                      {header}{' '}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <Movie
                    movie={movie}
                    onDelete={() => this.deletMovieHandle(movie)}
                    key={movie._id}
                    onLike={() => this.handleLike(movie)}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TableMovie;
