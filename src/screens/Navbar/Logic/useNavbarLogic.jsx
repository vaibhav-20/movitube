import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { authInstance } from '../../../config/firebase';
import {
  logOut,
  userLoadingBegins,
  userLoadingEnds,
} from '../../../features/user';
import {
  moviesError,
  moviesLoadingBegins,
  setApiEndPointAndGenere,
  setChangeHappened,
  storeGenres,
  storeMovies,
} from '../../../features/movies';
import {
  errorNofication,
  successNofication,
} from '../../../features/notification';

const useNavbarLogic = () => {
  const history = useHistory();
  const { userLoggedIn, info } = useSelector((state) => state.user.value);

  const [activeLink, setActiveLink] = useState('/');

  const handleActiveLink = (e) => {
    if (e.target.getAttribute('href') === '/') {
      setActiveLink('/');
    } else {
      const link = e.target.getAttribute('href').slice(1);
      setActiveLink(link);
    }
  };

  const dispatch = useDispatch();
  const apiKey = process.env.TMDB_API_KEY;

  const apiEndPoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  const { genres } = useSelector((state) => state.movies.value);
  const mounted = useRef(true);
  const genreDropDown = useRef(null);

  // Fetch generes
  useEffect(() => {
    const fetchGeneres = async () => {
      try {
        const response = await fetch(apiEndPoint);

        const data = await response.json();

        if (mounted.current) {
          dispatch(storeGenres(data.genres));
        }
      } catch (err) {
        dispatch(moviesError());
      }
    };

    if (genres.length === 0) {
      fetchGeneres();
    }

    return () => {
      mounted.current = false;
    };
  }, [apiEndPoint, dispatch, genres]);

  // Hide dropdowns when click elsewhere
  useEffect(() => {
    const clickListenerFunc = (e) => {
      if (!e.target.matches('.GEN') && genreDropDown.current) {
        genreDropDown.current.classList.remove('show');
      }
    };

    const clickEvent = document.body.addEventListener(
      'click',
      clickListenerFunc
    );

    return () => {
      window.removeEventListener('click', clickEvent);
    };
  }, []);

  const handleGenre = async (e) => {
    const id = e.target.getAttribute('data-id');

    setActiveLink('/');

    if (history.location.pathname !== '/') {
      history.push('/');
    }

    dispatch(moviesLoadingBegins());

    const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-IND&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=${id}`;

    dispatch(setApiEndPointAndGenere({ endPoint, genereId: id }));

    setTimeout(() => {
      dispatch(setChangeHappened(true));
    }, 1000);
  };

  const [keyword, setKeyword] = useState('');

  const handleClickOnLogo = () => {
    setActiveLink('/');
    setKeyword('');

    const endPointforPopularMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-IND&sort_by=popularity.desc&include_adult=false&include_video=true&with_watch_monetization_types=flatrate`;

    dispatch(
      setApiEndPointAndGenere({
        endPoint: endPointforPopularMovies,
        genereId: null,
      })
    );

    setTimeout(() => {
      dispatch(setChangeHappened(true));
    }, 2000);
  };

  const handleKeyword = async (e) => {
    const { value } = e.target;

    setKeyword(value);

    if (value) {
      if (history.location.pathname !== '/') {
        history.push('/');
      }

      const searchEndPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}&language=en-US&include_adult=false`;

      try {
        const response = await fetch(searchEndPoint);

        const { results } = await response.json();

        dispatch(setChangeHappened(true));

        dispatch(storeMovies(results));
      } catch (err) {
        dispatch(moviesError());
      }
    } else {
      handleClickOnLogo();
    }
  };

  const handleLogOut = () => {
    dispatch(userLoadingBegins());

    signOut(authInstance)
      .then(() => {
        dispatch(successNofication(`Successfully logged out user!`));
        dispatch(logOut());
      })
      .catch((err) => {
        dispatch(errorNofication(err.code));
        dispatch(userLoadingEnds());
      });
  };

  return {
    activeLink,
    handleActiveLink,
    genres,
    handleGenre,
    genreDropDown,
    keyword,
    handleKeyword,
    setKeyword,
    handleClickOnLogo,
    userLoggedIn,
    handleLogOut,
    info,
  };
};

export default useNavbarLogic;
