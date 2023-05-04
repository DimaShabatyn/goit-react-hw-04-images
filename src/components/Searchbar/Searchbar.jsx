// import SearchBar from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { notifyOptions } from 'utils/notify';
import PropTypes from 'prop-types';


export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onInputChange = ({target:{value}}) => {
    setSearch(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return toast.info('Please enter key words for search', notifyOptions);
    }
    onSubmit(search);
    setSearch('');
  };


  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <HiMagnifyingGlass size="24" />
        </button>

        <input
          onChange={onInputChange}
          value={search}
          name="search"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
