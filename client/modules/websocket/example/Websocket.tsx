import React, {useEffect, useState} from 'react';
import styles from "@/modules/websocket/page/styles/Websocket.module.scss";
import {websocketServer, wsServerUrl} from "@/utils/const";
import axios from "axios";

const Websocket = () => {
    const [sum, setSum] = useState(0);
    const [summand, setSummand] = useState(0);
    const [isConnecting, setIsConnecting] = useState(false);
    const [loadingText, setLoadingText] = useState<'' | 'Connecting.' | 'Connecting..' | 'Connecting...'>('');

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

    useEffect(() => {
        if(!isConnecting) return;
        setLoadingText('Connecting...')
    }, [isConnecting])

    useEffect(() => {
        const changeText = () => {
            if(!isConnecting) return;
            switch (loadingText) {
                case 'Connecting.':
                    setLoadingText('Connecting..')
                    break
                case 'Connecting..':
                    setLoadingText('Connecting...')
                    break
                case 'Connecting...':
                    setLoadingText('Connecting.')
                    break
            }
        }

        setTimeout(changeText, 1000)

    }, [loadingText])

    const waitForConnection = (callback: () => void, interval: number) => {
        if(socket.readyState === 1) {
            callback()
        } else {
            setIsConnecting(true)
            setTimeout(() => {
                waitForConnection(callback, interval)
            }, interval)
        }
    }

    const clickHandler = () => {
        if(socket.readyState === 1) {
            sendSummand()
        } else {
            setIsConnecting(true)
            waitForConnection(sendSummand, 3000)
        }
    }

    const sendSummand = () => {
        setIsConnecting(false)
        socket.send(JSON.stringify({summand}))
        setSummand(0)
    }

    if(isConnecting) {
        return (
            <div className={styles.example}>
                <h3>{loadingText}</h3>
            </div>
        )
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
            <button onClick={clickHandler}>
                Add
            </button>
        </div>
    );
};

export default Websocket;