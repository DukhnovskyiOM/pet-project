import React from "react";
import styles from "./modal.module.scss";

const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? `${styles.modal_active} ${styles.modal}` : styles.modal} onClick={() => setActive(false)}>
        <div className={active ? `${styles.content} ${styles.content_active}` : styles.content} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div> 
  );
};

export default Modal;
