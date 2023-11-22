import React from 'react';
import styles from '../../styles/Icon.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import styled from "styled-components";

interface ScrollTo {
    isArrowUp: boolean;
    id?: string;
    x?: number;
    y?: number;
}

const SI = styled.a`
  color: ${props => props.theme.text}
`

const ScrollTo: React.FC<ScrollTo> = ({isArrowUp, id, x, y}) => {
    const router = useRouter()

    const moveTo = () => {
        if (x !== undefined && y !== undefined) {
            window.scrollTo(x, y)
            router.push('/', undefined, {shallow: true})
        }
    }

    return (
        <SI href={id} className={styles.icon} onClick={moveTo}>
            <FontAwesomeIcon icon={isArrowUp ? faArrowUp : faArrowDown}/>
        </SI>
    );
};

export default ScrollTo;