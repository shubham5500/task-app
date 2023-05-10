import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message: string, type = 'default') => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'warning':
            toast.warn(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message);
            break;
    }
};

const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export {showToast, Toast};
