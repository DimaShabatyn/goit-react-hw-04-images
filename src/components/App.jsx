import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchPixabay from 'services/fetchPixabay';
import { Loader } from './Loader/Loader';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';


export default class App extends Component {
  state = {
    search: '',
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    images: [],
  };
  // render > didMount > getItem > setState > update > render > didUpdate > setItem
  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.getImages(search, page);
    }
    // if (prevState.search === search) {
    //   return toast.info(
    //     'Please enter another key words for search',
    //     notifyOptions
    //   );
    // }
  }
  getImages = (value, page) => {
    this.setState({ loading: true }); // вмикаємо індикатор завантаження
    if (this.state.error) {
      this.setState({ error: null });
    }
    // Викликаємо функцію getSearch, яка виконує запит на сервер.
    fetchPixabay(value, page)
      .then(dataImages => {
        console.log(dataImages);
        // if (value === this.state.search) {
        //   return toast.info('Please enter another key words for search', notifyOptions);
        // }
        this.setState(prevState => ({
          page: prevState.page,
          images:
            page === 1
              ? dataImages.hits
              : [...prevState.images, ...dataImages.hits], // додаємо нові картинки до масиву
          totalPages: Math.floor(dataImages.totalHits / 12),
        }));
      })
      .catch(error => {
        this.setState({ error: error.message }); // записуємо помилку в стейт
      })
      .finally(this.setState({ loading: false }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1, // збільшуємо номер сторінки на +1
    }));
  };

  handleSubmit = search => {
    this.setState({
      search: search,
      loading: false,
      error: null,
      page: 1,
      totalPages: 0,
      images: [],
    });
  };

  render() {
    const { images, error, loading, page, totalPages } = this.state;
    return (
      <>
        <div>
          <SearchBar onSubmit={this.handleSubmit} />

          {/* Перевіряємо, чи відбувається завантаження */}
          {loading && <Loader />}

          {/* Перевіряємо, чи є помилка */}
          {error && !loading && (
            <h2 style={{ textAlign: 'center' }}>
              Try again. Something went wrong!
            </h2>
          )}
          {totalPages === 0 && !images && (
            <h2 style={{ textAlign: 'center' }}>
              Try again. Photos not found!
            </h2>
          )}
          <ImageGallery images={images} />
          {images.length > 0 && !loading && page <= totalPages && (
            <Button onClick={this.onLoadMore} />
          )}
        </div>
        <ToastContainer transition={Slide} draggablePercent={60} />
      </>
    );
  }
}
