import React from 'react';
import Block from "@/components/blocks/Block";
import Animations from "@/modules/animations/example/Animations";
import styles from '../../styles/MainPart.module.scss';
import Redux from "@/modules/redux/example/Redux";
import StyledText from "@/modules/redux/example/StyledText";
import Websocket from "@/modules/websocket/example/Websocket";
import {articleDescriptions} from "@/utils/articleDescriptions";
import Resend from "@/modules/react flow + resend/example/Resend";
import ChatGPT from "@/modules/chatGPT/example/ChatGPT";
import Introduction from "@/modules/main/components/Introduction";

const MainPart = () => {

    return (
        <div className={styles.main}>
            <Introduction/>
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
                        {articleDescriptions.redux}
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
            <Block
                title={"React flow + resend"}
                customLink={`/react-flow+resend`}
                hasDescription
            >
                <Resend/>
            </Block>
            <Block
                title={'ChatGPT'}
                hasDescription
                hasLink
            >
                <ChatGPT/>
            </Block>
        </div>
    );
};

export default MainPart;