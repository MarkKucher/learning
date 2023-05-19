import React, {useState} from 'react';
import styles from '../../styles/Description.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/icons/Icon";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import {wrap} from "popmotion";

interface DescriptionExtendedProps {
    content: React.ReactNode[];
}

const StyledOption = styled.div`
  background: ${props => props.theme.text};
`

const StyledContent = styled(motion.div)`
    color: ${props => props.theme.text};
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.text};
    }
`

const distance = 400

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? distance : -distance,
            opacity: 0,
            zIndex: 0,
        };
    },
    center: {
        x: 0,
        opacity: 1,
        xIndex: 1,
    },
    exit: (direction: number) => {
        return {
            x: direction < 0 ? distance : -distance,
            opacity: 0,
            zIndex: 0,
        };
    }
};

const DescriptionExtended: React.FC<DescriptionExtendedProps> = ({content}) => {
    const [[page, direction], setPage] = useState([0, 0])

    const pageIndex = wrap(0, content.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className={styles.block}>
            <AnimatePresence initial={false} custom={direction}>
                <StyledContent
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={styles.content}
                    transition={{
                        x: { stiffness: 100, duration: 0.5 }
                    }}
                >
                    {content[pageIndex]}
                </StyledContent>
            </AnimatePresence>
            <div className={styles.control}>
                <Icon CN={"icon"} onClick={() => paginate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </Icon>
                {content.length > 3 && <div className={styles.options}>
                    {content.map((c, i) => (
                        <StyledOption
                            onClick={() => paginate(i - pageIndex)}
                            className={i === pageIndex ? `${styles.active} ${styles.option}` : styles.option}
                            key={i}
                        />
                    ))}
                </div>}
                <Icon CN={"icon"} onClick={() => paginate(1)}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </Icon>
            </div>
        </div>
    );
};

export default DescriptionExtended;