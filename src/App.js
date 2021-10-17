import { Component } from 'react';
import './App.css';
import { ImageGalery } from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/';

class App extends Component {
  state = {
    searchValue: '',
  };

  getSearchValues = searchValue => this.setState({ searchValue });

  render() {
    // const { searchValue } = this.state;
    const { getSearchValues } = this;

    return (
      <>
        <Searchbar getFormData={getSearchValues} />
        <ImageGalery />
      </>
    );
  }
}

export default App;
