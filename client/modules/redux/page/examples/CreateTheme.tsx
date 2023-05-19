import React, {useState} from 'react';
import styles from "../../../../styles/CreateTheme.module.scss";
import Text from "@/components/text/Text";
import Link from "@/components/Link";
import Button from "@/components/buttons/Button";
import Input from "@/components/Input";
import {useDispatch, useSelector} from "react-redux";
import ErrorMessage from "@/components/messages/ErrorMessage";
import {isValidColor} from "@/helpers/isValidColor";
import {createTheme, selectTheme} from "@/modules/themes/redux/themeSlice";
import {Theme} from "@/modules/themes/themeClass";
import {AnimatePresence, motion} from "framer-motion";
import {DefaultTheme} from "styled-components";

const CreateTheme = () => {
    const [name, setName] = useState('');
    const [mainGradient, setMainGradient] = useState('');
    const [subGradient, setSubGradient] = useState('');
    const [bodyBackground, setBodyBackground] = useState('');
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [mainScrollbarBackground, setMainScrollbarBackground] = useState('');
    const [subScrollbarBackground, setSubScrollbarBackground] = useState('');
    const [error, setError] = useState('');
    const {themes} = useSelector(selectTheme);
    const dispatch = useDispatch();

    const create = () => {
        if(!name) {
            setError('Theme must have name')
            return null;
        }
        if(themes.find(t => t.name === name)) {
            setError('This name is already used')
            return null;
        }
        if(!isValidColor(mainGradient)) {
            setError('Main gradient is not a color')
            return null;
        }
        if(!isValidColor(subGradient)) {
            setError('Sub gradient is not a color')
            return null;
        }
        if(!isValidColor(bodyBackground)) {
            setError('Body background is not a color')
            return null;
        }
        if(!isValidColor(text)) {
            setError('Text color is not a color')
            return null;
        }
        if(!isValidColor(description)) {
            setError('Description color is not a color')
            return null;
        }
        if(!isValidColor(mainScrollbarBackground)) {
            setError('Main scrollbar background is not a color')
            return null;
        }
        if(!isValidColor(subScrollbarBackground)) {
            setError('Sub scrollbar background is not a color')
            return null;
        }
        const theme: DefaultTheme = new Theme(name, mainGradient, subGradient, text, description, bodyBackground, mainScrollbarBackground, subScrollbarBackground, true)
        dispatch(createTheme(theme))
        setError('')
        setName('')
        setMainGradient('')
        setSubGradient('')
        setBodyBackground('')
        setText('')
        setDescription('')
        setMainScrollbarBackground('')
        setSubScrollbarBackground('')
    }

    return (
        <div className={styles.selection}>
            <div className={styles.row}>
                <Text className={styles.text}>Theme name: </Text>
                <Input className={styles.textInput} type={'text'} value={name} placeholder={'...'} onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Main gradient: </Text>
                <Input value={mainGradient} type={'color'} className={styles.color} onChange={(e) => {setMainGradient(e.target.value)}}/>
                <Text className={styles.text}>or</Text>
                <Input placeholder={'linear-gradient(...)'} type={'text'} className={styles.textInput} value={mainGradient} onChange={(e) => {setMainGradient(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Sub gradient: </Text>
                <Input value={subGradient} type={'color'} className={styles.color} onChange={(e) => {setSubGradient(e.target.value)}}/>
                <Text className={styles.text}>or</Text>
                <Input placeholder={'linear-gradient(...)'} type={'text'} className={styles.textInput} value={subGradient} onChange={(e) => {setSubGradient(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Body background: </Text>
                <Input value={bodyBackground} type={'color'} className={styles.color} onChange={(e) => {setBodyBackground(e.target.value)}}/>
                <Text className={styles.text}>or</Text>
                <Input placeholder={'linear-gradient(...)'} type={'text'} className={styles.textInput} value={bodyBackground} onChange={(e) => {setBodyBackground(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Text color: </Text>
                <Input value={text} type={'color'} className={styles.color} onChange={(e) => {setText(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Description color: </Text>
                <Input value={description} type={'color'} className={styles.color} onChange={(e) => {setDescription(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Main scrollbar: </Text>
                <Input value={mainScrollbarBackground} type={'color'} className={styles.color} onChange={(e) => {setMainScrollbarBackground(e.target.value)}}/>
                <Text className={styles.text}>or</Text>
                <Input placeholder={'linear-gradient(...)'} type={'text'} className={styles.textInput} value={mainScrollbarBackground} onChange={(e) => {setMainScrollbarBackground(e.target.value)}}/>
            </div>
            <div className={styles.row}>
                <Text className={styles.text}>Sub scrollbar: </Text>
                <Input value={subScrollbarBackground} type={'color'} className={styles.color} onChange={(e) => {setSubScrollbarBackground(e.target.value)}}/>
                <Text className={styles.text}>or</Text>
                <Input placeholder={'linear-gradient(...)'} type={'text'} className={styles.textInput} value={subScrollbarBackground} onChange={(e) => {setSubScrollbarBackground(e.target.value)}}/>
            </div>
            <motion.div className={styles.footer}>
                <AnimatePresence>
                    {error && <div className={styles.error}>
                        <ErrorMessage message={error}/>
                    </div>}
                </AnimatePresence>
                <div className={styles.button}>
                    <Button onClick={create}>
                        Create
                    </Button>
                </div>
            </motion.div>
            <div className={styles.link}>
                <Link title={'You can create gradients here'} link={'https://gradienta.io/editor'} shouldOpenInNewTab={true}/>
            </div>
        </div>
    );
};

export default CreateTheme;