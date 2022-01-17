import { Slide, toast } from 'react-toastify';

const useNotificationOps = () => {
  const showSuccessNotification = (msg) =>
    toast.success(msg, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });

  const showErrorNotification = (msg) =>
    toast.error(msg, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });

  return { showErrorNotification, showSuccessNotification };
};

export default useNotificationOps;
