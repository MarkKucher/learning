import React from 'react';
import Button from "@/components/buttons/Button";
import styles from "../../../styles/CodeSandbox.module.scss";

interface CodeSandboxProps {
    link: string;
}

const CodeSandboxButton: React.FC<CodeSandboxProps> = ({link}) => {

    const redirect = () => {
        window.open(link)
    }

    return (
        <Button className={styles.csbtn} text={'open in sandbox'} onClick={redirect}/>
    );
};

export default CodeSandboxButton;