import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import setValidationMessage from './setValidationMessage';

const validateForm = (
  credentials,
  validationMessageTags,
  setTimeOutId,
  validateFor
) => {
  let errorFlag = false;

  const { email, password, fullName, confirmPassword } = credentials;

  const {
    emailValidationMessageTag,
    fullNameValidationMessageTag,
    passwordValidationMessageTag,
    confirmPasswordValidationMessageTag,
  } = validationMessageTags;

  // Email Validation
  if (!isEmail(email)) {
    setValidationMessage(
      'invaild email address!',
      'error',
      setTimeOutId,
      emailValidationMessageTag
    );
    errorFlag = true;
  }

  if (isEmpty(email)) {
    setValidationMessage(
      "email can't be empty!",
      'error',
      setTimeOutId,
      emailValidationMessageTag
    );
    errorFlag = true;
  }

  if (validateFor === 'SIGN_UP') {
    // fullName validation
    if (isLength(fullName, 0, 2)) {
      setValidationMessage(
        'full name is too short!',
        'error',
        setTimeOutId,
        fullNameValidationMessageTag
      );
      errorFlag = true;
    }

    if (!isLength(fullName, 0, 20)) {
      setValidationMessage(
        'full name is too lengthy!',
        'error',
        setTimeOutId,
        fullNameValidationMessageTag
      );
      errorFlag = true;
    }

    if (isEmpty(fullName)) {
      setValidationMessage(
        "full name can't be empty!",
        'error',
        setTimeOutId,
        fullNameValidationMessageTag
      );
      errorFlag = true;
    }

    // Password validation
    if (!isLength(password, 0, 20)) {
      setValidationMessage(
        'password is too lengthy!',
        'error',
        setTimeOutId,
        passwordValidationMessageTag
      );
      errorFlag = true;
    }

    // Confirm password
    if (!isLength(confirmPassword, 0, 20)) {
      setValidationMessage(
        'Confirm password is too lengthy!',
        'error',
        setTimeOutId,
        confirmPasswordValidationMessageTag
      );
      errorFlag = true;
    }

    if (isLength(confirmPassword, 0, 2)) {
      setValidationMessage(
        'confirm password is too short!',
        'error',
        setTimeOutId,
        confirmPasswordValidationMessageTag
      );
      errorFlag = true;
    }

    if (isEmpty(confirmPassword)) {
      setValidationMessage(
        "confirm password can't be empty!",
        'error',
        setTimeOutId,
        confirmPasswordValidationMessageTag
      );
      errorFlag = true;
    }
  }

  // Password validation
  if (isLength(password, 0, 2)) {
    setValidationMessage(
      'password is too short!',
      'error',
      setTimeOutId,
      passwordValidationMessageTag
    );
    errorFlag = true;
  }

  if (isEmpty(password)) {
    setValidationMessage(
      "password can't be empty!",
      'error',
      setTimeOutId,
      passwordValidationMessageTag
    );
    errorFlag = true;
  }

  return errorFlag;
};

export default validateForm;
