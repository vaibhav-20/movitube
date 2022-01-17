import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { doc, updateDoc } from 'firebase/firestore';
import { firestoreInstance } from '../../../config/firebase';
import CircleLoader from '../../../components/CircleLoader';
import Button from '../../../components/Button';
import { errorNofication } from '../../../features/notification';

const EditPLaylist = ({ index, playlistName, playlistId }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(playlistName);

  const [changePlaylist, setChangePlaylist] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlePlaylistName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleChnagePlaylistName = () => {
    setChangePlaylist(true);
  };

  const cancleChnagePlaylistName = () => {
    setChangePlaylist(false);
    setName(playlistName);
  };

  const changePlaylistName = async () => {
    setLoading(true);

    const washingtonRef = doc(firestoreInstance, 'playlists', playlistId);

    try {
      await updateDoc(washingtonRef, {
        name,
      });

      setChangePlaylist(false);
      setName(name);

      setLoading(false);
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      setLoading(false);
      cancleChnagePlaylistName();
    }
  };

  if (loading) {
    return (
      <div style={{ width: '20%' }}>
        <CircleLoader wrapperMargin='12px 0' />
      </div>
    );
  }

  return (
    <Wrapper className='flex'>
      {changePlaylist ? (
        <>
          <span className='index'>{index + 1}.&nbsp;&nbsp;</span>
          <input type='text' value={name} onChange={handlePlaylistName} />
        </>
      ) : (
        <h2 className='name'>
          {index + 1}.&nbsp;
          {playlistName}
        </h2>
      )}

      <Button
        type='button'
        bgColor='#cdcfce'
        fs='0.9em'
        color='#0e0e0e'
        padding='4px 8px'
        borderRadius='5px'
        margin='0 0 0 15px'
        transform='scale(1)'
        // dataVal={m.id.toString()}
        handleClick={
          changePlaylist ? changePlaylistName : handleChnagePlaylistName
        }
      >
        {changePlaylist ? 'Submit' : 'Change playlist name'}
      </Button>

      {changePlaylist && (
        <Button
          type='button'
          bgColor='#cdcfce'
          fs='0.9em'
          color='#0e0e0e'
          padding='4px 8px'
          borderRadius='5px'
          margin='0 0 0 15px'
          transform='scale(1)'
          // dataVal={m.id.toString()}
          handleClick={cancleChnagePlaylistName}
        >
          Cancel
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  justify-content: flex-start;

  .name,
  .index {
    font-weight: 400;
    font-size: 1.8em;
    padding: 10px 0;
  }

  input {
    font-size: 0.9em;
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

EditPLaylist.propTypes = {
  index: PropTypes.number.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
};

export default EditPLaylist;
