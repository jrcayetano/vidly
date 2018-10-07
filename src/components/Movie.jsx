import React, { Component } from 'react';
import Like from './common/Like';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie
    };
  }
  render() {
    const {
      title,
      genre,
      numberInStock,
      dailyRentalRate,
      liked
    } = this.state.movie;
    return (
      <tr>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <Like liked={liked} onClick={this.props.onLike} />
        </td>
        <td>
          <button className="btn-danger btn-sm" onClick={this.props.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
