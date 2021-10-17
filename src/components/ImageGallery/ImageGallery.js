import { Component } from 'react';
import { pixabayApi } from '../../services/pixabayApi';

const newPixabayApi = new pixabayApi();
console.log(newPixabayApi);

export class ImageGalery extends Component {
  state = {
    searchResults: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {}

  handleClick = () => {
    this.setState({ status: 'pending' });
    newPixabayApi
      .fetchImage()
      .then(searchResults => {
        this.setState(prev => ({
          searchResults: [...prev.searchResults, ...searchResults.hits],
          status: 'resolved',
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'rejected' });
      });
  };
  render() {
    const { status } = this.state;
    const { handleClick } = this;
    if (status === 'idle') {
      return <h1>Hello</h1>;
    }
    if (status === 'pending') {
      return <h1>Please wait...</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul>
            {this.state.searchResults.map(el => (
              <li key={el.id}>
                <img src={el.webformatURL} alt=" " />
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleClick}>
            Load more
          </button>
        </>
      );
    }
    if (status === 'regected') {
      return <h1>Error!</h1>;
    }
  }
}
