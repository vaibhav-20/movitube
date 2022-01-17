import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { errorNofication } from '../../features/notification';
import Loading from '../../components/Loading';
import Movie from '../Movie/Movie';
import { setChangeHappened, storeMovies } from '../../features/movies';

const Home = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    movieLoading,
    apiEndPoint,
    currentGenereId,
    genres,
    movies: globalMovies,
  } = useSelector((state) => state.movies.value);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiEndPoint}&page=${page}`);
        const { results } = await response.json();

        if (mounted) {
          dispatch(storeMovies(results));
          setLoading(false);
        }
      } catch (err) {
        dispatch(errorNofication(err.code));
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [apiEndPoint, dispatch, page, currentGenereId]);

  // The innerHeight property returns the height of a window's content area.

  // The scrollHeight property returns the entire height of an element in pixels, including padding, but not the       border, scrollbar or margin.

  // The read-only scrollY property of the Window interface returns the number of pixels that the document is currently scrolled vertically.

  useEffect(() => {
    let mounted = true;

    const scrollEvent = window.addEventListener('scroll', () => {
      const ineerHeightPlusScrollY = window.innerHeight + window.scrollY;

      // globalMovies.length === 0 &&

      if (
        !loading &&
        ineerHeightPlusScrollY >= document.body.scrollHeight - 100
      ) {
        if (mounted) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      }
    });

    return () => {
      mounted = false;
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [apiEndPoint, loading, globalMovies.length]);

  const [newMovies, setNewMovies] = useState([]);
  const { movies, changeHappened } = useSelector((state) => state.movies.value);

  useEffect(() => {
    if (changeHappened) {
      setNewMovies(movies);
      dispatch(setChangeHappened(false));
    } else {
      setNewMovies((prevMovies) => [...prevMovies, ...movies]);
    }
  }, [movies, changeHappened, dispatch]);

  if (movieLoading) {
    return <Loading />;
  }

  let currentGenere = '';

  if (!loading && !movieLoading) {
    if (currentGenereId) {
      genres.forEach((item) => {
        if (item.id === +currentGenereId) {
          currentGenere = item.name;
        }
      });
    }
  }

  return (
    <Wrapper>
      <div className='heading'>
        {newMovies.length !== 0 && (
          <>
            {currentGenere !== ''
              ? `${currentGenere} genere movies:`
              : 'Popular Movies'}
          </>
        )}
      </div>

      {newMovies.length !== 0 ? (
        <div className='movies '>
          {newMovies.map((item) => (
            <Movie
              movie={item}
              key={Math.floor(Math.random() * item.id * Date.now())}
            />
          ))}
        </div>
      ) : (
        <h1 className='no_movies'>Please wait! Data is loading...</h1>
      )}

      {loading && <Loading size='20vh' />}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin: 50px 0 30px;

  .heading {
    font-size: 1.5em;
    font-weight: 800;
    text-align: center;
    font-family: "Lucida Grande";
    margin:1rem 0;
    padding-bottom: 5px;
    border-radius:50px;
    border: 2px solid yellow;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(225px, auto));
    gap: 30px 20px;
  }

  .no_movies {
    text-align: center;
    margin-top: 100px;
    font-weight: 400;
    font-size: 1.2em;
  }
`;

export default Home;
