import React, {useState} from 'react';
import ChangeThemeIcon from "./ChangeThemeIcon";
import Themes from "./Themes";
import {AnimatePresence} from "framer-motion";

const ChangeTheme = () => {
    const [shouldOpen, setShouldOpen] = useState<boolean>(false)

    return (
        <div>
            <ChangeThemeIcon setShouldOpen={setShouldOpen}/>
            <AnimatePresence>
                {shouldOpen && <Themes/>}
            </AnimatePresence>
        </div>
    );
};

export default ChangeTheme;