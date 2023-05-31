import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import './index.css';

const API_KEY = '36274489-574cd7b2e6e5eaf2239dbc903';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (query === '') return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?q=${encodeURIComponent(
            query
          )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (response.data.hits.length === 0) {
          setHasError(true);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setHasError(false);
        }
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setIsLoadingMore(false);
        }, 650);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    if (newQuery === '') {
      toast.error('Please enter a search query.', {
        position: 'top-center',
      });
    } else {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setHasError(false);
    }
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoadingMore(true);
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      {hasError && <p>Not found images</p>}
      {!hasError && images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {!hasError && images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMoreClick} disabled={isLoadingMore}>
          {isLoadingMore ? <Loader /> : 'Load More'}
        </Button>
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleModalClose} />
      )}
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
