import PropTypes from 'prop-types';

export default function Button({ handleClick }) {
  // window.scrollTo({
  //   top: document.documentElement.scrollHeight,
  //   behavior: 'smooth',
  // });

  return (
    <button type="button" className="Button" onClick={handleClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
};
