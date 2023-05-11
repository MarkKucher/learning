import React, {useState} from 'react';
import {faCopy, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "../../styles/Icon.module.scss";
import StyledIcon from "@/components/styled/StyledIcon";

interface CopyIcon {
    text: string;
}

const CopyIcon: React.FC<CopyIcon> = ({text}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const copyText = async () => {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <StyledIcon CN={!isCopied ? "smaller" : "succeeded"} onClick={copyText}>
            {!isCopied ? <FontAwesomeIcon icon={faCopy}/> : <FontAwesomeIcon icon={faCheck}/>}
        </StyledIcon>
    );
};

export default CopyIcon;