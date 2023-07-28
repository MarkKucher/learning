import React, {useEffect, useState} from 'react';
import styles from "@/modules/websocket/page/styles/Websocket.module.scss";
import {websocketServer} from "@/modules/websocket/page/utils/const";

const Websocket = () => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        let socket = new WebSocket(websocketServer + '/quantity')
        const openHandler = () => {
            socket.readyState === socket.OPEN && socket.send(JSON.stringify({method: 'open'}))
        }
        const closeHandler = () => {
            console.log('onclose')
            socket.readyState === socket.OPEN && socket.send(JSON.stringify({method: 'close'}))
        }
        socket.onopen = () => {
            openHandler()
        }
        window.onbeforeunload = () => {
            closeHandler()
        }
        // document.onvisibilitychange = (e) => {
        //     if (document.visibilityState == 'hidden') {
        //         closeHandler()
        //     } else if(document.visibilityState == 'visible') {
        //         openHandler()
        //     }
        // }
        socket.onmessage = (e) => {
            setQuantity(e.data)
        }
        return () => {
            socket.close()
        }
    }, [])


    return (
        <div className={styles.example}>
            Visitors: {quantity}
        </div>
    );
};

export default Websocket;