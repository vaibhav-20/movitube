import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { firestoreInstance } from '../../config/firebase';
import {
  errorNofication,
  successNofication,
} from '../../features/notification';
import { storeUserInfo, userLoadingEnds } from '../../features/user';

const Movie = ({ movie }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { info, userLoggedIn, id } = useSelector((state) => state.user.value);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  const dislikeMovie = async (e) => {
    e.preventDefault();

    if (mounted.current) setLoading(true);

    try {
      const userDocRef = doc(firestoreInstance, 'users', id);

      await updateDoc(userDocRef, {
        likedMovies: arrayRemove(movie.id),
      });

      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        dispatch(
          storeUserInfo({
            info: docSnap.data(),
            id,
          })
        );
      }

      if (mounted.current) setLoading(false);

      dispatch(successNofication(`disliked the movie!`));
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      dispatch(userLoadingEnds());
    }
  };

  const likeMovie = async (e) => {
    e.preventDefault();

    if (mounted.current) setLoading(true);

    try {
      const userDocRef = doc(firestoreInstance, 'users', id);

      await updateDoc(userDocRef, {
        likedMovies: arrayUnion(movie.id),
      });

      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        dispatch(
          storeUserInfo({
            info: docSnap.data(),
            id,
          })
        );
      }

      if (mounted.current) setLoading(false);
      dispatch(successNofication(`liked the movie!`));
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      dispatch(userLoadingEnds());
    }
  };

  const showLoginMessage = (e) => {
    e.preventDefault();
    dispatch(errorNofication('You must login to like movies!'));
  };

  return (
    <Wrapper>
      <Link to={`/movie/${movie.id}`}>
        <div className='image'>
          <img
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>

        <div className='cover'>
          <h1 className='title'>{movie.original_title}</h1>
        </div>

        <p className='rating'>{movie.vote_average}</p>

        {userLoggedIn && (
          <div className='like_or_dislike flex'>
            {info.likedMovies.includes(movie.id) ? (
              <FcLike fontSize='1.3em' onClick={dislikeMovie} />
            ) : (
              <FcLikePlaceholder fontSize='1.3em' onClick={likeMovie} />
            )}
          </div>
        )}

        {!userLoggedIn && (
          <div className='like_or_dislike flex'>
            <FcLikePlaceholder fontSize='1.3em' onClick={showLoginMessage} />
          </div>
        )}
      </Link>

      {loading && (
        <div className='loading_cover'>
          <h1>Loading...</h1>
        </div>
      )}
    </Wrapper>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

const Wrapper = styled.main`
  position: relative;
  transition: transform 0.5s ease;
  border-radius: 10px;
  overflow: hidden;

  a {
    width: 100%;
  }

  .image {
    height: 100%;
    min-width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cover {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    .title {
      position: absolute;
      width: 100%;
      bottom: 0;
      background-color: #fff;
      font-size: 1em;
      font-weight: 700;
      color: #000;
      text-align: center;
      padding: 8px 0;
    }
  }

  .rating {
    font-size: 0.9em;
    position: absolute;
    top: 5px;
    left: 5px;
    background: rgba(0, 0, 0, 0.8);
    display: grid;
    place-content: center;
    padding: 7px;
    border-radius: 50%;
  }

  .like_or_dislike {
    position: absolute;
    top: 8px;
    right: 5px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.9);
    padding: 7px;
  }

  :hover {
    cursor: pointer;
    transform: scale(1.04) translateY(-5px);
  }

  .loading_cover {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    display: grid;
    place-content: center;
    background: rgba(0, 0, 0, 0.8);

    h1 {
      font-size: 1em;
      font-weight: 500;
      letter-spacing: 1px;
    }
  }
`;

export default Movie;
