import { Component } from 'react';
import './App.css';
import ImageGalery from './components/ImageGallery';
import Searchbar from './components/Searchbar/';
import { pixabayApi } from './services/pixabayApi';
import Modal from './components/Modal/';

const newPixabayApi = new pixabayApi();
class App extends Component {
  state = {
    searchValue: '',
    modalImg: '',
    showModal: false,
  };

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

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const { dataset, nodeName } = e.target;

    if (nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        modalImg: dataset.large,
        showModal: !showModal,
      }));
    }
  };

  render() {
    const { searchValue, showModal, modalImg } = this.state;
    const { getSearchValues, toggleModal, openModal } = this;

    return (
      <div className="App">
        <Searchbar getFormData={getSearchValues} />
        <ImageGalery searchValue={searchValue} openModal={openModal} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
