import React from 'react';
import Portal from "./Portal";
import styles from "../../styles/Modal.module.scss";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({children}) => {

    return (
        <Portal>
            <div className={styles.main}>
                {children}
            </div>
        </Portal>
    );
};

export default Modal;