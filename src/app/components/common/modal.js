import React, { useState } from "react";


const Modal =({children})=>{
   const [isOpen, setIsOpen]=useState(false);
    const openModal = ()=>{
        setIsOpen(true);
    };


const closeModal = ()=>{
    setIsOpen(false);
};
return(
    <>
    <button className="text-blue-500" onClick={openModal}> edit
        <svg xmlns="http://www.w3.org/2000/svg"  className="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
            strokeWidth={2} d="M14 5l5 5L5 19H3v-2l9-9zM15 13l2-2"/>
         </svg>
    </button>
    {isOpen &&(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg">
                <button className="absolute left-90 m-4 text-gray-500 " onClick={closeModal}>
                    <svg className="h-6 
                    w-6" fill="none" viewBox="0 0 20 20 " stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={3
                        } d="M6 18L18 6M6 6l12 12"/>

                    </svg>
                </button>
                {children}
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded " onClick={closeModal}>
                    Submit
                </button>
            </div>
        </div>
    )}
    </>
);
};
export default Modal;