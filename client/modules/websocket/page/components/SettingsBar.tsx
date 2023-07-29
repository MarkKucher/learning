import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from '@/modules/websocket/page/styles/Websocket.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    selectPaint,
    setHeight,
    setImgDataUrl,
    setLineWidth,
    setStrokeColor,
    setWidth
} from "@/modules/websocket/page/redux/paint";

const SettingsBar = () => {
    const dispatch = useDispatch();
    const [widthState, setWidthState] = useState(500);
    const [heightState, setHeightState] = useState(500);
    const {canvas} = useSelector(selectPaint);
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        setFirstRender(true)
    }, [])

    let onResize = () => {
        if(widthState > window.innerWidth * 0.8) {
            dispatch(setWidth(window.innerWidth * 0.8))
        }
    }

    useEffect(() => {
        let maxWidth = Math.floor(window.innerWidth * 0.8)
        if(maxWidth < 500) {
            console.log(maxWidth)
            dispatch(setWidth(maxWidth))
        }
        window.addEventListener('resize', onResize, {passive: true})
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [firstRender])

    const isSizeAllowable = (w: number, h: number) => {
        return w >= 250 && w <= window.innerWidth - 200 && h >= 250 && h <= 1500
    }

    const resize = () => {
        dispatch(setWidth(widthState))
        dispatch(setHeight(heightState))
    }

    return (
        <div className={styles.settingsBar}>
            <div className={styles.settings__section}>
                <div className={styles.settings__section__option}>
                    <label style={{marginLeft: 0}} className={styles.label} htmlFor={'line-width'}>Line width</label>
                    <input
                        onChange={(e) => {dispatch(setLineWidth(Number(e.target.value)))}}
                        id={'line-width'}
                        type={'number'}
                        defaultValue={1}
                        min={1}
                        max={50}
                        className={styles.input}
                    />
                </div>
                <div className={styles.settings__section__option}>
                    <label className={styles.label} htmlFor={'stroke-color'}>Stroke color</label>
                    <input
                        onChange={(e) => {dispatch(setStrokeColor(e.target.value))}}
                        id={'stroke-color'}
                        type={'color'}
                        className={`${styles.color} ${styles.input}`}
                    />
                </div>
            </div>
            <div className={styles.settings__section}>
                <div className={styles.settings__section__option}>
                    <label style={{marginLeft: 'auto'}} htmlFor={'canvas-width'} className={styles.label}>Width</label>
                    <input
                        onChange={(e) => {setWidthState(Number(e.target.value))}}
                        id={'canvas-width'}
                        type={'number'}
                        min={250}
                        defaultValue={500}
                        max={window.innerWidth * 0.8}
                        className={styles.input}
                    />
                </div>
                <div className={styles.settings__section__option}>
                    <label htmlFor={'canvas-height'} className={styles.label}>Height</label>
                    <input
                        onChange={(e) => {setHeightState(Number(e.target.value))}}
                        id={'canvas-height'}
                        type={'number'}
                        min={250}
                        defaultValue={500}
                        max={1500}
                        className={styles.input}
                    />
                </div>
                <div className={styles.settings__section__option}>
                    <button disabled={!isSizeAllowable(widthState, heightState)} onClick={resize} className={styles.button}>resize</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsBar;