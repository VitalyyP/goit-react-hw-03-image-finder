import { Component } from 'react';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ value });
  };

  handleSubmite = event => {
    const { value } = this.state;
    event.preventDefault();
    this.props.getFormData(value); //getFormData
    this.reset();
  };

  reset = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    const { handleInputChange, handleSubmite } = this;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmite}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
