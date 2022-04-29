import { useEffect, useState } from 'react';
import { Container } from 'components/Container.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { animateScroll as scroll } from 'react-scroll';
import * as API from 'services/api';
import Notiflix from 'notiflix';

export const App = () => {
  //обьявляем стейт
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function fetch() {
      try {
        setLoading(true);
        const galleryItems = await API.searchItem(searchQuery, currentPage);
        setLoading(false);
        if (galleryItems.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        Result(galleryItems);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [currentPage, searchQuery]);

  const Result = galleryItems => {
    const imagesArray = galleryItems.hits.map(
      ({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      })
    );

    gallery.length === 0
      ? setGallery(imagesArray)
      : setGallery(prevGallery => [...prevGallery, ...imagesArray]);
    setTotalHits(galleryItems.totalHits);
    setError(true);
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    scrollToBottom();
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const searchQueryValue = evt.target.elements.searchQuery.value;

    searchQueryValue.trim() === ''
      ? Notiflix.Notify.warning('Please enter a request name!')
      : setSearchQuery(searchQueryValue.toLowerCase());
    setCurrentPage(1);
    setGallery([]);
  };

  const totalImages = totalHits - currentPage * 12;
  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {totalHits !== 0 && error && <ImageGallery gallery={gallery} />}
      <Loader loading={loading} />
      {totalImages > 0 && !loading && <Button loadMore={loadMore} />}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     gallery: [],
//     totalHits: 0,
//     currentPage: 1,
//     loading: false,
//     error: null,
//   };

//   scrollToBottom = () => {
//     scroll.scrollToBottom();
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
//     this.scrollToBottom();
//   };

//   async componentDidUpdate(_, prevState) {
//     const { currentPage, searchQuery } = this.state;
//     if (
//       prevState.searchQuery !== searchQuery ||
//       prevState.currentPage !== currentPage
//     ) {
//       try {
//         this.setState({ loading: true });

//         const galleryItems = await API.searchItem(searchQuery, currentPage);

//         this.setState({ galleryItems, loading: false });

//         if (galleryItems.totalHits === 0) {
//           Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//         }

//         const imagesArray = galleryItems.hits.map(
//           ({ id, webformatURL, largeImageURL }) => ({
//             id,
//             webformatURL,
//             largeImageURL,
//           })
//         );

//         this.state.gallery.length === 0
//           ? this.setState({
//               gallery: imagesArray,
//               totalHits: galleryItems.totalHits,
//               error: null,
//             })
//           : this.setState(prevState => ({
//               gallery: [...prevState.gallery, ...imagesArray],
//               error: null,
//             }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   handleSubmit = evt => {
//     evt.preventDefault();
//     const searchQueryValue = evt.target.elements.searchQuery.value;

//     searchQueryValue.trim() === ''
//       ? Notiflix.Notify.warning('Please enter a request name!')
//       : this.setState({
//           searchQuery: searchQueryValue.toLowerCase(),
//           currentPage: 1,
//           gallery: [],
//         });
//   };

//   render() {
//     const { totalHits, gallery, currentPage, loading } = this.state;
//     const totalImages = totalHits - currentPage * 12;
//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleSubmit} />

//         {totalHits !== 0 && <ImageGallery gallery={gallery} />}
//         <Loader loading={loading} />
//         {totalImages > 0 && !loading && <Button loadMore={this.loadMore} />}
//       </Container>
//     );
//   }
// }
