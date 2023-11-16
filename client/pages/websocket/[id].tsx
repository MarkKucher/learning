import React, {useEffect} from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/modules/header/Header";
import PaintOnline from "@/modules/websocket/page/PaintOnline";
import {useDispatch} from "react-redux";
import {setSessionId} from "@/modules/websocket/page/redux/paint";

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