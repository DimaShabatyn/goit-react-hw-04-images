// import SearchBar from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
const customId = 'custom-id-yes';

const notifyOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  toastId: customId,
};

export default class SearchBar extends Component {
  state = { search: '' };
  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value.toLowerCase() });
  };

  resetForm = () => {
    this.setState({ search: '' });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return toast.info('Please enter key words for search', notifyOptions);
    }
    this.props.onSubmit(this.state.search);
    this.resetForm();
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <HiMagnifyingGlass size="24" />
          </button>

          <input
            onChange={this.onInputChange}
            value={this.state.search}
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
  }
}
