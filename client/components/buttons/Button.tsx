import React, {MouseEventHandler} from 'react';
import styles from '../../styles/Button.module.scss';

interface ButtonProps {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({text, onClick, className}) => {
    return (
        <button className={className ? className : styles.button} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;