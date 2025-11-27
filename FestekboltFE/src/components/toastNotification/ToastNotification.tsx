import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './ToastNotification.module.css';
import { IoIosCheckmarkCircleOutline, IoIosWarning, IoIosInformationCircleOutline } from "react-icons/io";

const icons = {
  success: <IoIosCheckmarkCircleOutline />,
  error: <IoIosWarning />,
  info: <IoIosInformationCircleOutline />,
};

export const ToastNotification = () => {
  const { message, type, isVisible, hideNotification } = useNotification();

  // Conditionally apply the 'show' class based on the isVisible state
  const toastClasses = [
    styles.toast,
    styles[type],
    isVisible ? styles.show : styles.hide
  ].join(' ');

  return (
    <div className={toastClasses} onClick={hideNotification}>
      <div className={styles.icon}>{icons[type]}</div>
      <p>{message}</p>
    </div>
  );
};
