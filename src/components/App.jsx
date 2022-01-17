import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import Navbar from '../screens/Navbar/Navbar';
import Home from '../screens/Home/Home';
import MovieDetails from '../screens/MovieDetails/MovieDetails';
import Login from '../screens/Login/Login';
import { authInstance, firestoreInstance } from '../config/firebase';
import {
  storeUserInfo,
  userLoadingBegins,
  userLoadingEnds,
} from '../features/user';
import Loading from './Loading';
import useNotificationOps from './useNotificationOps';
import Signup from '../screens/Signup/Signup';
import WatchLater from '../screens/WatchLater/WatchLater';
import {
  clearNotification,
  errorNofication,
  successNofication,
} from '../features/notification';
import LikedMovies from '../screens/LikedMovies/LikedMovies';
import Error from '../screens/Error';
import Playlists from '../screens/Playlists/Playlists';

const App = () => {
  const dispatch = useDispatch();

  const { userLoading } = useSelector((state) => state.user.value);

  const { message, success, error } = useSelector(
    (state) => state.notification.value
  );

  const { showSuccessNotification, showErrorNotification } =
    useNotificationOps();

  // For showing notification
  useEffect(() => {
    if (message && success) {
      showSuccessNotification(message);
      dispatch(clearNotification());
    }

    if (message && error) {
      showErrorNotification(message);
      dispatch(clearNotification());
    }
  }, [
    message,
    success,
    error,
    showSuccessNotification,
    showErrorNotification,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(userLoadingBegins());

    const fetchUserData = async (email) => {
      const usersRef = collection(firestoreInstance, 'users');

      const q = query(usersRef, where('email', '==', email));

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          dispatch(successNofication(`Welcome back ${doc.get('fullName')}`));

          dispatch(storeUserInfo({ info: doc.data(), id: doc.id }));
        });
      } catch (err) {
        dispatch(errorNofication(err.code.slice(5)));
        dispatch(userLoadingEnds());
      }
    };

    const saveUserInfoinFirestore = async (info) => {
      try {
        const userDocRef = await addDoc(
          collection(firestoreInstance, 'users'),
          info
        );

        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          dispatch(
            successNofication(`Welcome back ${docSnap.get('fullName')}`)
          );

          dispatch(storeUserInfo({ info: docSnap.data(), id: docSnap.id }));
        } else {
          dispatch(userLoadingEnds());
        }
      } catch (err) {
        dispatch(errorNofication(err.code.slice(5)));
        dispatch(userLoadingEnds());
      }
    };

    const checkIfUserInfoSaved = async (userInfo) => {
      try {
        const q = query(
          collection(firestoreInstance, 'users'),
          where('email', '==', userInfo.email)
        );

        const usersSnapshot = await getDocs(q);

        if (usersSnapshot.size === 0) {
          saveUserInfoinFirestore(userInfo);
        } else {
          fetchUserData(userInfo.email);
        }
      } catch (err) {
        dispatch(errorNofication(err.code.slice(5)));
        dispatch(userLoadingEnds());
      }
    };

    onAuthStateChanged(authInstance, (user) => {
      if (user) {
        // Runs when you log in using email and password
        if (user.providerData[0].providerId === 'password') {
          fetchUserData(user.email);
        } else {
          // Runs when you log in using twitter
          const userInfo = {
            fullName: user.displayName,
            email: user.email,
            dp: user.photoURL,
            likedMovies: [],
            watchLater: [],
          };

          checkIfUserInfoSaved(userInfo);
        }
      } else {
        dispatch(userLoadingEnds());
      }
    });
  }, [dispatch]);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />

      <Wrapper className='w-960'>
        <Router>
          <Navbar />

          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>

            <Route path='/login' exact>
              <Login />
            </Route>

            <Route path='/signup' exact>
              <Signup />
            </Route>

            <Route path='/watch-later' exact>
              <WatchLater />
            </Route>

            <Route path='/liked-movies' exact>
              <LikedMovies />
            </Route>

            <Route path='/playlists' exact>
              <Playlists />
            </Route>

            <Route path='/movie/:id' exact>
              <MovieDetails />
            </Route>

            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
  /* border: 1px solid #575757; */
`;

export default App;
