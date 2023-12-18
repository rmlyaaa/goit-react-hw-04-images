import { GlobalStyle } from './GlobalStyle';
import { useState, useEffect } from 'react';
import { SerchBar } from './SearchBar/SearchBar';
import { fetchQuerry } from 'api';
import { GalleryList } from './GalleryList/GalleryList';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImage, setTotalImage] = useState(0);

  useEffect(() => {
    if (query !== '') {
      async function fetchImage() {
        try {
          setLoader(true);
          const newQuerry = query.split('/');
          const imageList = await fetchQuerry(newQuerry[1], page);
          setImages(prevImages => [...prevImages, ...imageList.hits]);
          setTotalImage(imageList.totalHits);
        } catch (error) {
          toast.error('Error! Try again');
        } finally {
          setLoader(false);
        }
      }
      fetchImage();
    }
  }, [query, page]);

  const onSubmit = evt => {
    evt.preventDefault();
    const newQuery = evt.target.elements.querry.value.trim();
    if (!newQuery) {
      return toast.error('Can not be empty');
    }
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <GlobalStyle />
      <SerchBar onSubmit={onSubmit} />
      {images.length > 0 && <GalleryList imagesList={images} />}
      {12 * page < totalImage && !loader && <LoadMore loadMore={loadMore} />}
      {loader && <Loader />}
      <Toaster />
    </div>
  );
};
