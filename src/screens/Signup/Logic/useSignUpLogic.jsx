import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import {
  // successNofication,
  errorNofication,
  successNofication,
} from '../../../features/notification';
import { userLoadingBegins, userLoadingEnds } from '../../../features/user';
import {
  authInstance,
  firestoreInstance,
  storageInstance,
} from '../../../config/firebase';
import validateForm from '../../../utils/validateForm';
import setValidationMessage from '../../../utils/setValidationMessage';
import clearAllSetTimeoutOrSetInterval from '../../../utils/clearAllSetTimeoutOrSetInterval';

const useSignUpLogic = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const vmTags = {
    emailValidationMessageTag: useRef(),
    passwordValidationMessageTag: useRef(),
    confirmPasswordValidationMessageTag: useRef(),
    fullNameValidationMessageTag: useRef(),
  };

  const displayPictureValidationMessageTag = useRef();

  const lastSetTimeOutId = useRef();

  // Showing/removing password matched message
  useEffect(() => {
    if (
      credentials.confirmPassword &&
      credentials.password === credentials.confirmPassword
    ) {
      setValidationMessage(
        'password matched',
        'success',
        lastSetTimeOutId,
        vmTags.confirmPasswordValidationMessageTag,
        4000
      );
    } else {
      vmTags.confirmPasswordValidationMessageTag.current.innerText = '';
    }

    return () => {
      clearAllSetTimeoutOrSetInterval(lastSetTimeOutId);
    };
  }, [
    lastSetTimeOutId,
    credentials.confirmPassword,
    credentials.password,
    vmTags.confirmPasswordValidationMessageTag,
  ]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const [displayPicture, setDisplayPicture] = useState({
    file: null,
    preview: '',
  });

  const handleDisplayPic = (e) => {
    const file = e.target.files[0];
    setDisplayPicture({ file, preview: URL.createObjectURL(file) });
  };

  const history = useHistory();

  const signUpUser = () => {
    createUserWithEmailAndPassword(
      authInstance,
      credentials.email,
      credentials.confirmPassword
    )
      .then(() => {
        dispatch(successNofication('Successfully signed up!'));
        history.push('/');
        console.log('user doc saved!');
      })
      .catch((err) => {
        dispatch(errorNofication(err.code));
        dispatch(userLoadingEnds());
      });
  };

  const saveUserInfoInFirestore = async (dpUrl, picName) => {
    const { password, confirmPassword, ...userInfo } = credentials;

    try {
      await addDoc(collection(firestoreInstance, 'users'), {
        ...userInfo,
        dp: {
          fileName: picName,
          url: dpUrl,
        },
        likedMovies: [],
        watchLater: [],
      });

      signUpUser();
    } catch (err) {
      dispatch(errorNofication(err.code));
      dispatch(userLoadingEnds());
    }
  };

  const uploadDp = async () => {
    const picName = `DP_${credentials.email}_${Math.floor(
      Math.random() * Date.now()
    )}`;

    const dpImageRef = ref(
      storageInstance,
      `displayPictures/${picName}.${displayPicture.file.type.split('/')[1]}`
    );

    try {
      await uploadBytes(dpImageRef, displayPicture.file);

      const dpUrl = await getDownloadURL(dpImageRef);
      saveUserInfoInFirestore(dpUrl, picName);
    } catch (err) {
      dispatch(errorNofication(err.code));
      dispatch(userLoadingEnds());
    }
  };

  const handleSubmit = async () => {
    let error = validateForm(credentials, vmTags, lastSetTimeOutId, 'SIGN_UP');

    if (displayPicture.file === null) {
      error = true;
      setValidationMessage(
        'You must select display picture!',
        'error',
        lastSetTimeOutId,
        displayPictureValidationMessageTag
      );
    }

    if (!error) {
      dispatch(userLoadingBegins());

      try {
        const methods = await fetchSignInMethodsForEmail(
          authInstance,
          credentials.email
        );

        if (methods.length > 0) {
          dispatch(userLoadingEnds());

          dispatch(
            errorNofication(
              'This email address is already being used by someone else!'
            )
          );
        } else {
          uploadDp();
        }
      } catch (err) {
        dispatch(errorNofication(err.code));
        dispatch(userLoadingEnds());
      }

      // signUpUser();
    }
  };

  return {
    handleSubmit,
    handleInput,
    credentials,
    vmTags,
    handleDisplayPic,
    displayPicture,
    displayPictureValidationMessageTag,
  };
};

export default useSignUpLogic;
