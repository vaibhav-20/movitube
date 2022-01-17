import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useNavbarLogic from './Logic/useNavbarLogic';
import Button from '../../components/Button';

const Navbar = () => {
  const {
    activeLink,
    handleActiveLink,
    genres,
    handleGenre,
    genreDropDown,
    handleKeyword,
    keyword,
    handleClickOnLogo,
    userLoggedIn,
    handleLogOut,
    info,
  } = useNavbarLogic();

  return (
    <Wrapper className='flex nav-container'>
      <Link to='/' className='logo' onClick={handleClickOnLogo}>
        <span>MoviTube</span>
      </Link>

      <div className='search'>
        <input
          type='text'
          value={keyword}
          placeholder='Search movie'
          onChange={handleKeyword}
        />
      </div>

      {userLoggedIn && (
        <div className='flex dp-container'>
          <div className='user_dp'>
            <img
              src={typeof info.dp === 'string' ? info.dp : info.dp.url}
              alt=''
            />
          </div>

          <div className='display_name'>
            {info.displayName ? info.displayName : info.fullName}
          </div>
        </div>
      )}

      <ul className='links flex'>
        <li>
          <Link
            to='/'
            onClick={handleActiveLink}
            className={activeLink === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>

        {userLoggedIn && (
          <>
            <li>
              <Link
                to='/liked-movies'
                onClick={handleActiveLink}
                className={activeLink === 'liked-movies' ? 'active' : ''}
              >
                liked Movies
              </Link>
            </li>

            <li>
              <Link
                to='/watch-later'
                onClick={handleActiveLink}
                className={activeLink === 'watch-later' ? 'active' : ''}
              >
                Watch later
              </Link>
            </li>
          </>
        )}

        {!userLoggedIn && (
          <li>
            <Link
              to='/login'
              onClick={handleActiveLink}
              className={activeLink === 'login' ? 'active' : ''}
            >
              Login
            </Link>
          </li>
        )}

        {!userLoggedIn && (
          <li>
            <Link
              to='/signup'
              onClick={handleActiveLink}
              className={activeLink === 'signup' ? 'active' : ''}
            >
              Signup
            </Link>
          </li>
        )}

        {userLoggedIn && (
          <li>
            <Link
              to='/playlists'
              onClick={handleActiveLink}
              className={activeLink === 'playlists' ? 'active' : ''}
            >
              Playlists
            </Link>
          </li>
        )}

        <li
          className='genere'
          onClick={() => genreDropDown.current.classList.add('show')}
        >
          <span className='GEN'>Genere</span>
        </li>

        <div className='genere_dropdown flex' ref={genreDropDown}>
          {genres.length !== 0 &&
            genres.map((item) => (
              <span key={item.id} data-id={item.id} onClick={handleGenre}>
                {item.name}
              </span>
            ))}
        </div>

        {userLoggedIn && (
          <li>
            <Button
              type='submit'
              fs='0.9em'
              width='100%'
              padding='4px 8px'
              margin='0 0 0 5px'
              borderRadius='5px'
              bgColor='#eb4343'
              color='#fffbfb'
              transform=''
              fWeight='500'
              handleClick={handleLogOut}
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  justify-content: space-around;
  width:1300px;
  margin: 10px 0;
  margin-left: -170px;
  border:2px solid #B762C1;
  box-shadow: -4px 7px 20px -1px rgba(137,70,166,0.76);
-webkit-box-shadow: -4px 7px 20px -1px rgba(137,70,166,0.76);
-moz-box-shadow: -4px 7px 20px -1px rgba(137,70,166,0.76);
  padding: 10px;

  .logo {
    span {
      font-size: 2em;
      font-weight: 600;
     font-family: 'Helvetica Neue';
    }
  }

  .search {
    input {
      font-size: 1em;
      padding: 8px 30px;
      border-radius: 10px;
      margin-left: 20px;
    
    }
  }

  .dp-container{
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
  }

  .user_dp {
    width: 70px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .display_name {
    margin-left: 15px;
    font-weight: 600;
    color: #ffffff;
    font-size: 0.95em;
  
  }

  .links {
    position: relative;

    li {
      margin-left: 4px;
      transition: all 0.4s ease;

      a,
      span {
        font-weight: 800;
        padding: 8px 10px;
        font-size: 0.9em;

      }
    }

    a:hover,
    span:hover {
      background-color: #fff;
      color: black;
      font-weight: 400;
      border-radius: 4px;
      cursor: pointer;
    }

    a.active {
      background-color: #fff;
      color: black;
      font-weight: 400;
      border-radius: 4px;
    }
  }

  .genere_dropdown {
    position: absolute;
    top: 120%;
    right: 0;
    z-index: 2;
    background: #8946A6;
    width: 200px;
    height: 300px;
    padding: 10px 15px;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    opacity: 0;
    pointer-events: none;

    span {
      width: 100%;
      padding: 5px;
    }
  }

  .genere_dropdown.show {
    opacity: 0.95;
    pointer-events: all;
  }
`;

export default Navbar;
