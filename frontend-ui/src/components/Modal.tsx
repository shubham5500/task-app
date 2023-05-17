import React, {FC, useState} from 'react';
import {HiOutlineX} from "react-icons/hi";

interface pageProps {
    isOpen: boolean,
    showFooter?: boolean,
    toggleModal(): void,
    onSave?(): void,
    children: JSX.Element,
}

const Modal: FC<pageProps> = ({isOpen, toggleModal, onSave, showFooter = true, children}) => {

    return (
        <>
            {/* Modal */}
            <div className={`modal z-[1] fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={toggleModal}/>

                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-[1] overflow-y-auto">

                    {/* Modal content */}
                    <div className="modal-content py-4 text-left px-6">

                        {/* Modal title */}
                        <div className="modal-header text-lg font-semibold relative">
                            Modal Title
                            <div className="modal-close cursor-pointer flex justify-end absolute right-0 top-0" onClick={toggleModal}>
                                <HiOutlineX size={30} className={'text-primary'}/>
                            </div>
                        </div>

                        {/* Modal body */}
                        <div className="modal-body mt-8">
                            {children}
                        </div>

                        {/* Modal footer */}
                        {showFooter && <div className="modal-footer mt-4 flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={onSave}>
                                Save
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4"
                                onClick={toggleModal}>
                                Cancel
                            </button>
                        </div>}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
