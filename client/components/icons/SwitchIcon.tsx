import React from 'react';
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import StyledIcon from "@/components/styled/StyledIcon";

interface SwitchIconProps {
    isOpen: boolean;
}

const SwitchIcon: React.FC<SwitchIconProps> = ({isOpen}) => {

    const transition = {
        rotate: { stiffness: 1000}
    }

    const animation = {
        open: {
            rotate: '180deg'
        },
        closed: {
            rotate: '360deg',
        }
    }

    return (
        <StyledIcon CN={"switchIcon"}>
            <motion.div initial={{rotate: '360deg'}} transition={transition} variants={animation} animate={isOpen ? 'open' : 'closed'}>
                <FontAwesomeIcon icon={faChevronUp}/>
            </motion.div>
        </StyledIcon>
    );
};

export default SwitchIcon;