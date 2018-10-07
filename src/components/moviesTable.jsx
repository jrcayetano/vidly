import React, { Component } from 'react';
import Movie from './Movie';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' }
  ];
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    console.log(movies);
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} />

        <tbody>
          {movies.map(movie => (
            <Movie
              movie={movie}
              onDelete={() => onDelete(movie)}
              key={movie._id}
              onLike={() => onLike(movie)}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
