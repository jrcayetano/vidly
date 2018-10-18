import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie, getMovie } from '../services/fakeMovieService';
class MoviesForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
    list: []
  };
  constructor(props) {
    super(props);
  }

 

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(5)
      .required()
      .label('Rate')
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if(movieId === 'new') return;

    const movie = getMovie(movieId);
    if(!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) })
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre_id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    
    this.props.history.push('/movies');
  };

  render() {
    const { match } = this.props;
    console.log('--->', this.state.list);
    return (
      <React.Fragment>
        <h1>Movies Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </React.Fragment>
    );
  }
}

export default MoviesForm;
/*
const MoviesForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movies Form {match.params.id}</h1>
      <button className="btn-primary" onClick={() => history.push('/movies')}>
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
*/
