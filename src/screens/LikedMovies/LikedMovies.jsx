import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { errorNofication } from '../../features/notification';
import Movie from '../Movie/Movie';

const LikedMovies = () => {
  const dispatch = useDispatch();

  const { info, userLoggedIn, userLoading } = useSelector(
    (state) => state.user.value
  );
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.TMDB_API_KEY;

  useEffect(() => {
    if (userLoggedIn && info.likedMovies.length !== 0) {
      setLoading(true);

      const newMovies = [];

      info.likedMovies.forEach(async (item, index) => {
        try {
          const res = await fetch(
            ` https://api.themoviedb.org/3/movie/${item}?api_key=${apiKey}&language=en-US&append_to_response=videos`
          );

          const data = await res.json();

          newMovies.push(data);

          if (info.likedMovies.length - 1 === index) {
            setMovies(newMovies);
            setLoading(false);
          }
        } catch (err) {
          dispatch(errorNofication(err.code.slice(5)));
          setLoading(false);
        }
      });
    } else {
      setMovies([]);
    }
  }, [userLoggedIn, info.likedMovies, dispatch, apiKey]);

  if (userLoading || loading) {
    return <Loading />;
  }

  return (
    <Wrapper movies={movies}>
      {movies.length !== 0 ? (
        <>
          <h1 className='heading'>Movies that you have liked</h1>
          <div className='movies'>
            {movies.map((item) => (
              <Movie movie={item} key={item.id} />
            ))}
          </div>
        </>
      ) : (
        <h1 className='no_movies'>You haven&apos;t liked any movie yet!</h1>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin: 10px 0 30px;

  .heading {
    font-size: 1.5em;
    font-weight: 400;
    padding: 15px 0;
    margin-bottom: 10px;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(225px, auto));
    grid-template-rows: ${({ movies }) => movies.length < 3 && '510px'};
    gap: 30px 20px;
  }

  .no_movies {
    text-align: center;
    margin-top: 100px;
    font-weight: 400;
    font-size: 1.2em;
  }
`;

export default LikedMovies;
