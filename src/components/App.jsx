import { useEffect, useState } from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Searchbar} from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPixabay } from 'services/fetchPixabay';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { notifyOptions } from 'utils/notify';

export const App = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!search) return;
    if (page === 1) {
      setImages([]);
    }
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const dataImages = await fetchPixabay(page, search);
        // console.log(search);
        // console.log(dataImages);
        setImages(prevImages => [...prevImages, ...dataImages.hits]);
        if (!dataImages.hits.length) {
          return toast.error(
            'We not found images. Please, enter another phrase.',
            notifyOptions
          );
        }
        setTotalPages(Math.floor(dataImages.totalHits / 12));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, search]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = value => {
    if (value === search) {
      return toast.info(
        'We already found images. Please, enter another phrase.',
        notifyOptions
      );
    }
    setSearch(value);
    setPage(1);
  };

  return (
    <>
      <div>
        <Searchbar onSubmit={handleSubmit} />

        {/* Перевіряємо, чи відбувається завантаження */}
        {isLoading && <Loader />}

        {/* Перевіряємо, чи є помилка */}
        {error && !isLoading && (
          <h2 style={{ textAlign: 'center' }}>
            Try again. Something went wrong!
          </h2>
        )}
        {totalPages === 0 && !images && (
          <h2 style={{ textAlign: 'center' }}>Try again. Photos not found!</h2>
        )}
        <ImageGallery images={images} />
        {images.length > 0 && !isLoading && page <= totalPages && (
          <Button onClick={onLoadMore} />
        )}
      </div>
      <ToastContainer transition={Slide} draggablePercent={60} />
    </>
  );
};

