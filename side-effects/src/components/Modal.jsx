import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, handleOnClose, children }) {
  const dialog = useRef();

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });
  useEffect(() => {
    // needs to be inside useEffect bcs
    // we only want these to run after the component is executed
    if (open) {
      dialog.current.showModal();
    }
    else {
      dialog.current.close();
    }
  }, [open]);

  // handle esc button for closing the modal, use onClose event listener

  return createPortal(
    <dialog className="modal" ref={dialog} onClose = {handleOnClose}>
      {open && children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
