import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Movie from './Movie';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';

class TableMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      headerTable: ['Title', 'Genre', 'Stock', 'Rate', 'liked', ''],
      pageSize: 4,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.setState({ movies: getMovies() });
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
    console.log('Page change', page);
  };

  render() {
    const { currentPage, pageSize, movies: allMovies } = this.state;

    const movieMessage =
      this.state.movies.length !== 0 ? (
        <p>Showing {this.state.movies.length} movies in the database</p>
      ) : (
        <p>There is not movie on database</p>
      );
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        {movieMessage}
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
          itemsCount={this.state.movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default TableMovie;
