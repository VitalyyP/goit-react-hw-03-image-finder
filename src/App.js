import { Component } from 'react';
import './App.css';
import { ImageGalery } from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/';
import { pixabayApi } from './services/pixabayApi';

const newPixabayApi = new pixabayApi();
class App extends Component {
  state = {
    searchValue: '',
    // searchResults: [],
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchValue !== this.state.searchValue) {
  //     newPixabayApi;
  //   }
  // }
  getSearchValues = searchValue => this.setState({ searchValue });

  searchImages = data =>
    newPixabayApi
      .fetchImage(data)
      .then(searchResults => {
        this.setState(prev => ({
          searchResults: [...prev.searchResults, ...searchResults.hits],
          // searchValue: {this.value},
          status: 'resolved',
          searchValue: data,
        }));
        console.log(searchResults);
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'rejected' });
      });

  render() {
    const { searchValue } = this.state;
    const { searchImages, getSearchValues } = this;

    return (
      <div className="App">
        <Searchbar getFormData={getSearchValues} />
        <ImageGalery searchValue={searchValue} />
        {/* <ImageGalery searchResults={searchResults} /> */}
      </div>
    );
  }
}

export default App;
