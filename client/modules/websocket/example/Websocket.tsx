import React, {useEffect, useState} from 'react';
import styles from "@/modules/websocket/page/styles/Websocket.module.scss";
import {websocketServer, wsServerUrl} from "@/utils/const";
import axios from "axios";

const Websocket = () => {
    const [sum, setSum] = useState(0);
    const [summand, setSummand] = useState(0);

    const socket = new WebSocket(websocketServer + '/example');

    useEffect(() => {
        const getSumFromServer = async () => {
            const response = await axios.get(wsServerUrl + '/example');
            const sumFromServer = response.data
            setSum(sumFromServer)
        }

        getSumFromServer()

        socket.onmessage = (e ) => {
            const {sum} = JSON.parse(e.data);
            setSum(sum)
        }
    }, [])

    const sendSummand = () => {
        socket.send(JSON.stringify({summand}))
        setSummand(0)
    }

    return (
        <div className={styles.example}>
            <div>
                Sum: {sum}
            </div>
            <input
                type={'number'}
                value={summand}
                onChange={(e) => {setSummand(Number(e.target.value))}}
                max={99999}
                min={-99999}
            />
            <button onClick={sendSummand}>
                Add
            </button>
        </div>
    );
};

export default Websocket;