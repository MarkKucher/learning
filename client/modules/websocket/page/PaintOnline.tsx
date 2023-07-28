import React, {useEffect} from 'react';
import TopicBlock from "@/modules/example/TopicBlock";
import styles from "@/modules/websocket/page/styles/Websocket.module.scss";
import SettingsBar from "@/modules/websocket/page/components/SettingsBar";
import Toolbar from "@/modules/websocket/page/components/Toolbar";
import Canvas from "@/modules/websocket/page/components/Canvas";
import {websocketServer} from "@/modules/websocket/page/utils/const";
import {useParams} from "next/navigation";

const PaintOnline = () => {

    return (
        <TopicBlock title={'Websocket'} id={'Websocket'}>
            <div className={styles.main}>
                <div className={styles.bars}>
                    <Toolbar/>
                    <SettingsBar/>
                </div>
                <Canvas/>
            </div>
        </TopicBlock>
    );
};

export default PaintOnline;