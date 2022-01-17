import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { authInstance } from '../../../config/firebase';

import { userLoadingBegins, userLoadingEnds } from '../../../features/user';
import { errorNofication } from '../../../features/notification';
import validateForm from '../../../utils/validateForm';

const useLoginLogic = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const { userLoggedIn } = useSelector((state) => state.user.value);
  const lastTimeOutId = useRef(0);

  useEffect(() => {
    if (userLoggedIn) {
      history.push('/');
    }
  }, [history, userLoggedIn]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const emailValidationMessageTag = useRef(null);
  const passwordValidationMessageTag = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm(
      credentials,
      {
        emailValidationMessageTag,
        passwordValidationMessageTag,
      },
      lastTimeOutId,
      'SIGN_IN'
    );

    if (!error) {
      dispatch(userLoadingBegins());

      signInWithEmailAndPassword(
        authInstance,
        credentials.email,
        credentials.password
      )
        .then(() => {})
        .catch((err) => {
          dispatch(errorNofication(err.code.slice(5)));
          dispatch(userLoadingEnds());
        });
    }
  };

 

  const loginAsRandomUser = () => {
    dispatch(userLoadingBegins());

    const users = [
      { email: 'mohan11@gmail.com', password: 'aaaaaa' },
      { email: 'sohan11@gmail.com', password: 'aaaaaa' },
      { email: 'abhi11@gmail.com', password: 'aaaaaa' },
      { email: 'mukesh11@gmail.com', password: 'aaaaaa' },
      { email: 'ramesh11@gmail.com', password: 'aaaaaa' },
      { email: 'kamlesh11@gmail.com', password: 'aaaaaa' },
    ];

    const randomUser = users[Math.floor(Math.random() * users.length)];

    signInWithEmailAndPassword(
      authInstance,
      randomUser.email,
      randomUser.password
    )
      .then(() => {})
      .catch((err) => {
        dispatch(errorNofication(err.code.slice(5)));
        dispatch(userLoadingEnds());
      });
  };

  return {
    handleInput,
    credentials,
    handleSubmit,
    emailValidationMessageTag,
    passwordValidationMessageTag,
    loginAsRandomUser,
  };
};

export default useLoginLogic;
