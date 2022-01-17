const setValidationMessage = (
  message,
  cssClass,
  setTimeOutId,
  refObj,
  ms = 3000
) => {
  const pTag = refObj.current;

  pTag.innerText = message;
  pTag.classList.remove('remove');
  pTag.classList.add(cssClass);

  const setTimeOut = setTimeout(() => {
    pTag.classList.remove(cssClass);
    pTag.classList.add('remove');
    pTag.innerText = '';
  }, ms);

  setTimeOutId.current = setTimeOut;
};

export default setValidationMessage;
