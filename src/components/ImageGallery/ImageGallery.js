import { Component } from 'react';
import { pixabayApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

const newPixabayApi = new pixabayApi();
console.log(newPixabayApi);

class ImageGalery extends Component {
  state = {
    // searchQuery: this.props.searchValue,
    searchResults: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      console.log('get fetch');
      this.setState({ status: 'pending' });
      newPixabayApi.resetPage();
      newPixabayApi.searchQuery = this.props.searchValue;
      newPixabayApi
        .fetchImages()
        .then(searchResults => {
          console.log(searchResults.hits);
          this.setState({ searchResults: searchResults.hits, status: 'resolved' });
        })
        .catch(err => {
          console.log(err);
          this.setState({ status: 'rejected' });
        });

      // const { length } = prevState.searchResults;
      // const { arrayImg } = this.state;

      if (prevState.searchResults.length !== this.state.searchResults.length) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }

  handleClick = () => {
    newPixabayApi
      .fetchImages()
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
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // });
  };

  setModalImage() {
    const { openModal } = this.props;
  }
  render() {
    const { status } = this.state;
    const { handleClick, setModalImage } = this;

    if (status === 'idle') {
      return <h1>Hello</h1>;
    }
    if (status === 'pending') {
      return <h1>Please wait...</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery" onClick={setModalImage}>
            {this.state.searchResults.map(el => (
              <ImageGalleryItem key={el.id} item={el} />
            ))}
          </ul>
          <Button handleClick={handleClick} />
        </>
      );
    }
    if (status === 'regected') {
      return <h1>Error!</h1>;
    }
  }
}

export default ImageGalery;
