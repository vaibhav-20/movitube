import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, where, query, onSnapshot } from 'firebase/firestore';
import { firestoreInstance } from '../../config/firebase';
import Loading from '../../components/Loading';
import Playlist from './Playlist/Playlist';

const Playlists = () => {
  const dispatch = useDispatch();

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useSelector((state) => state.user.value);

  const apiKey = process.env.TMDB_API_KEY;

  useEffect(() => {
    let mounted = true;

    if (mounted) setLoading(true);

    const q = query(
      collection(firestoreInstance, 'playlists'),
      where('userId', '==', id)
    );

    const unsubscribe = onSnapshot(q, (playlistSnap) => {
      const newPlaylists = [];
      let index = 0;

      playlistSnap.forEach((p) => {
        newPlaylists.push({
          ...p.data(),
          id: p.id,
        });

        if (playlistSnap.size - 1 === index) {
          if (mounted) {
            setPlaylists(newPlaylists);
            setLoading(false);
          }
        }

        index += 1;
      });

      if (playlistSnap.size === 0) {
        if (mounted) {
          setPlaylists([]);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [dispatch, id, apiKey]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {playlists.length !== 0 ? (
        playlists.map((item, index) => (
          <Playlist key={item.id} item={item} index={index} />
        ))
      ) : (
        <h2 className='no_playlists'>
          You haven&rsquo;t created any playlist yet!
        </h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-top: 30px;

  .no_playlists {
    font-weight: 400;
    font-size: 1.5em;
    padding: 10px 0;
    text-align: center;
    margin-top: 102px;
  }
`;

export default Playlists;
