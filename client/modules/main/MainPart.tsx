import React from 'react';
import Block from "@/components/blocks/Block";
import Animations from "@/modules/animations/example/Animations";
import styles from '../../styles/MainPart.module.scss';
import Redux from "@/modules/redux/example/Redux";
import {useSelector} from "react-redux";
import {selectExample} from "@/modules/redux/store/slices/exampleSlice";
import StyledText from "@/modules/redux/example/StyledText";

const MainPart = () => {
    const {isBold, isCursive, isUnderlined} = useSelector(selectExample)

    return (
        <div className={styles.main}>
            <Block
                title={'Animations'}
                hasDescription
                hasLink
            >
                <Animations/>
            </Block>
            <Block
                title={'Redux'}
                customDescription={
                    <StyledText>
                        {'Redux is a library that helps manage states across all application. In this example you can see that small container affects a big one thanks to redux.'}
                    </StyledText>
                }
            >
                <Redux/>
            </Block>
        </div>
    );
};

export default MainPart;