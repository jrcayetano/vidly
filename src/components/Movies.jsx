import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import SearchBox from './common/searchBox'

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      searchQuery: '',
      genres: [],
      selectedGenre: null,
      sortColumn: { path: 'title', order: 'asc' }
    };
  }

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState( {searchQuery: query, selectedGenre: null, currentpage: 1} )
  }

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;


    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    // const movieMessage =
    //   filtered.length !== 0 ? (
    //     <p>Showing {filtered.length} movies in the database</p>
    //   ) : (
    //     <p>There is not movie on database</p>
    //   );

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { totalCount, data: movies } = this.getPageData();

    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres: allGenres,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    const { match, history } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20}}
            >
              New Movie
            </Link>
            <p>Showing {totalCount} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
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

export default Movies;
