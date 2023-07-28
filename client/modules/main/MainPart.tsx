import React from 'react';
import Block from "@/components/blocks/Block";
import Animations from "@/modules/animations/example/Animations";
import styles from '../../styles/MainPart.module.scss';
import Redux from "@/modules/redux/example/Redux";
import {useSelector} from "react-redux";
import {selectExample} from "@/modules/redux/store/slices/exampleSlice";
import StyledText from "@/modules/redux/example/StyledText";
import Websocket from "@/modules/websocket/example/Websocket";

const MainPart = () => {

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
                hasLink
                customDescription={
                    <StyledText>
                        Redux is a library that helps manage states across all application. In this example you can see that small container affects a big one thanks to redux.
                    </StyledText>
                }
            >
                <Redux/>
            </Block>
            <Block
                title={"Websocket"}
                customLink={`/websocket/f${(+new Date).toString(16)}`}
                hasDescription
            >
                <Websocket/>
            </Block>
        </div>
    );
};

export default MainPart;