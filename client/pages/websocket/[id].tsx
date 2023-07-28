import React, {useEffect} from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/modules/header/Header";
import PaintOnline from "@/modules/websocket/page/PaintOnline";
import {useParams} from "next/navigation";
import {websocketServer} from "@/modules/websocket/page/utils/const";
import {useDispatch, useSelector} from "react-redux";
import {selectPaint, setSessionId, setSocket} from "@/modules/websocket/page/redux/paint";
import Brush from "@/modules/websocket/page/tools/Brush";

interface WebsocketProps {
    id: string;
}

const Websocket: React.FC<WebsocketProps> = ({id}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSessionId(id))
    }, [])

    return (
        <MainLayout>
            <Header/>
            <PaintOnline/>
        </MainLayout>
    );
};

export default Websocket;

export async function getServerSideProps(context: any) {
    const { params } = context;
    const id = params.id;
    return {
        props: {id}
    }
}