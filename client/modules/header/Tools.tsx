import React from 'react';
import styles from "../../styles/Header.module.scss";

interface ToolsProps {
    children: React.ReactNode;
}

const Tools: React.FC<ToolsProps> = ({children}) => {
    return (
        <div className={styles.tools}>
            {children}
        </div>
    );
};

export default Tools;