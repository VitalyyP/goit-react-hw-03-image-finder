import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item }) {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={item.webformatURL} alt=" " />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  concact: PropTypes.string,
  deleteContact: PropTypes.func,
};
