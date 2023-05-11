import React, {useEffect} from 'react';
import styles from "../../styles/CodeExample.module.scss";
import Prism from "prismjs";
import CopyIcon from "@/components/icons/CopyIcon";
import CodeSandboxButton from "@/modules/example/buttons/CodeSandboxButton";


interface CodeExampleProps {
    code: string;
    language: string;
    codesandboxLink?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({code, language, codesandboxLink}) => {

    useEffect(() => {
        Prism.highlightAll();
    }, [])

    return (
        <div className={styles.container}>
            <pre className={styles.code}>
                <header className={styles.header}>
                    <CopyIcon text={code}/>
                </header>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
            {codesandboxLink && <CodeSandboxButton link={codesandboxLink}/>}
        </div>
    );
};

export default CodeExample;