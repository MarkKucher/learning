import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from '@/modules/websocket/page/styles/Websocket.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    pushToUndo,
    selectPaint,
    setCanvas, setImgDataUrl,
    setSessionId,
    setSocket,
    setTool, setWidth
} from "@/modules/websocket/page/redux/paint";
import Brush from "@/modules/websocket/page/tools/Brush";
import Tool from "@/modules/websocket/page/tools/Tool";
import axios from "axios";
import {websocketServer, wsServerUrl} from "@/utils/const";

interface Message {
    id: string;
    method: string;
    src: string;
}

const Canvas = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {sessionId, socket, width, height} = useSelector(selectPaint);
    const timeoutRef = useRef<any>(null);
    const [shouldDraw, setShouldDraw] = useState(true);

    useEffect(() => {
        if(canvasRef.current) {
            dispatch(setCanvas(canvasRef.current))
        }
    }, [])

    const draw = () => {
        if(!sessionId) return;
        axios.get(`${wsServerUrl}/image?id=${sessionId}`)
            .then((res) => {
                if(!res.data) return;
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext('2d')
                const img = new Image();
                img.src = res.data;
                img.onload = () => {
                    canvas && ctx && ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                }
            })
    }

    useEffect(() => {
        draw()
    }, [sessionId])

    useEffect(() => {
        const socket = new WebSocket(websocketServer)
        canvasRef.current && dispatch(setTool(new Brush(canvasRef.current)))
        socket.onopen = () => {
            socket.send(JSON.stringify({
                id: sessionId,
                method: 'connection'
            }))
        }
        dispatch(setSocket(socket))
        socket.onmessage = (e) => {
            let msg = JSON.parse(e.data)
            switch (msg.method) {
                case 'connection':
                    console.log('someone has connected')
                    break
                case 'draw':
                    drawHandler(msg)
                    break
            }
        }
    }, [])

    const drawHandler = (msg: Message) => {
        const img = new Image()
        img.src = msg.src
        const ctx = canvasRef?.current?.getContext('2d')
        canvasRef.current && ctx && ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        img.onload = () => {
            ctx && canvasRef.current && ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
        }
    }

    const mouseDownHandler = () => {
        if(canvasRef.current) dispatch(pushToUndo(canvasRef.current.toDataURL()))
    }

    const mouseLooseHandler = () => {
        if(!canvasRef.current || !sessionId) return;
        axios.post(`${wsServerUrl}/image?id=${sessionId}`, {img: canvasRef.current.toDataURL()})
        if(socket) Tool.sendImage(canvasRef.current, socket, sessionId)
    }

    let onResize = useCallback(() => {
        setShouldDraw(false)
        if(timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setShouldDraw(true)
        }, 900)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize, {passive: true})
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    useEffect(() => {
        shouldDraw && draw()
    }, [width, height, shouldDraw])

    return (
        <div className={styles.canvas}>
            <canvas
                onMouseUp={mouseLooseHandler}
                onMouseOver={mouseLooseHandler}
                onTouchEnd={mouseLooseHandler}
                onMouseDown={mouseDownHandler}
                ref={canvasRef}
                width={width}
                height={height}
            />
        </div>
    );
};

export default Canvas;