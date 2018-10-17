import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
class MoviesForm extends Form {
  state = {
    data: { title: '', genre: '', numberInStock: '', dailyRentalRate: '' },
    errors: {},
    list: []
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ list: getGenres() });
  }

  schema = {
    title: Joi.string()
      .required()
      .label('Title'),
    genre: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(5)
      .required()
      .label('Rate')
  };

  doSubmit = () => {
    const { history } = this.props;
    history.push('/movies');
    //  const username = this.username.current.value;
    console.log('submitted');
  };

  render() {
    const { match } = this.props;
    console.log('--->', this.state.list);
    return (
      <React.Fragment>
        <h1>Movies Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderDropdown('genre', 'Genre', this.state.list)}
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
