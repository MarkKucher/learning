import React, {useState} from 'react';
import styles from '../../../../styles/Menu.module.scss';
import SwitchIcon from "@/components/icons/SwitchIcon";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";

interface DirectoryProps {
    children: React.ReactNode;
    title: string;
}

const StyledTitle = styled.h3`
  color: ${props => props.theme.text};
`

const Directory: React.FC<DirectoryProps> = ({children, title}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <motion.div className={styles.directory}>
            <div className={styles.row} onClick={() => {setIsOpen(prev => !prev)}}>
                <SwitchIcon isOpen={isOpen}/>
                <StyledTitle>{title}</StyledTitle>
            </div>
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{y: -8, opacity: 0, height: 0}}
                    animate={{y: 0, opacity: 1, height: 'auto'}}
                    exit={{y: -8, opacity: 0, height: 0}}
                    transition={{stiffness: 1000}}
                    className={styles.links}

                >
                    {children}
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
};

export default Directory;