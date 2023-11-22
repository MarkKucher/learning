import React from 'react';
import styles from "../styles/Websocket.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectPaint, setFillColor, setStrokeColor, setTool} from "@/modules/websocket/page/redux/paint";
import Brush from "@/modules/websocket/page/tools/Brush";
import Rect from "@/modules/websocket/page/tools/Rect";
import Circle from "@/modules/websocket/page/tools/Circle";
import Line from "@/modules/websocket/page/tools/Line";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrush, faRefresh} from "@fortawesome/free-solid-svg-icons";
import Eraser from "@/modules/websocket/page/tools/Eraser";
import Tool from "@/modules/websocket/page/tools/Tool";
import axios from "axios";
import {serverUrl} from "@/utils/const";

const Toolbar = () => {
    const {canvas, socket, sessionId} = useSelector(selectPaint);
    const dispatch = useDispatch();

    const changeTool = (tool: any) => {
        return () => {
            if(canvas) {
                dispatch(setTool(new tool(canvas)))
            }
        }
    }

    const clearCanvas = () => {
        const ctx = canvas.getContext('2d');
        if(!canvas || !sessionId || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        axios.post(`${serverUrl}/image?id=${sessionId}`, {img: canvas.toDataURL()})
        if(socket) Tool.sendImage(canvas, socket, sessionId)
    }

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFillColor(e.target.value))
        dispatch(setStrokeColor(e.target.value))
    }

    const download = () => {
        if(!canvas || !sessionId) return;
        const dataUrl = canvas.toDataURL();
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = sessionId + '.jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className={styles.toolbar}>
            <FontAwesomeIcon icon={faBrush} className={`${styles.toolbar__btn} ${styles.brush}`} onClick={changeTool(Brush)}/>
            <button className={`${styles.toolbar__btn} ${styles.rect}`} onClick={changeTool(Rect)}/>
            <button className={`${styles.toolbar__btn} ${styles.circle}`} onClick={changeTool(Circle)}/>
            <button className={`${styles.toolbar__btn} ${styles.eraser}`} onClick={changeTool(Eraser)}/>
            <button className={`${styles.toolbar__btn} ${styles.line}`} onClick={changeTool(Line)}/>
            <input className={`${styles.color} ${styles.toolbar__input}`} onChange={(e) => {changeColor(e)}} type={"color"}/>
            {/*<button onClick={() => {dispatch(undo(null))}} className={`${styles.toolbar__btn} ${styles.undo}`}/>*/}
            {/*<button onClick={() => {dispatch(redo(null))}} className={`${styles.toolbar__btn} ${styles.redo}`}/>*/}
            <FontAwesomeIcon onClick={clearCanvas} className={`${styles.toolbar__btn} ${styles.refresh}`} icon={faRefresh}/>
            <button className={`${styles.toolbar__btn} ${styles.save}`} onClick={download}/>
        </div>
    );
};

export default Toolbar;