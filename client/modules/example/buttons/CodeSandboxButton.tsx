import React from 'react';
import styles from "../../../styles/Button.module.scss";

interface CodeSandboxProps {
    link: string;
}

const CodeSandboxButton: React.FC<CodeSandboxProps> = ({link}) => {

    const redirect = () => {
        window.open(link)
    }

    return (
        <button className={styles.csbtn} onClick={redirect}>open in sandbox</button>
    );
};

export default CodeSandboxButton;