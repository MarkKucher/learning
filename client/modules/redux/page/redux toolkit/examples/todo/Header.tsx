import React, {useRef, useState} from 'react';
import styles from "@/../../../../../../../server/styles/Todo.module.scss";
import {addTodo, selectTodoIds} from "@/modules/redux/store/slices/todoSlice";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const [text, setText] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const ids = useSelector(selectTodoIds);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = text.trim();
        if(e.key === 'Enter' && trimmedText) {
            dispatch(addTodo({id: ids.length, text: text, color: "", completed: false}))
            inputRef.current?.blur();
            setText('')
        }
    }

    return (
        <div className={styles.header} style={{borderColor: isFocused ? 'black' : 'gray'}}>
            <input
                ref={inputRef}
                className={styles.createTodoInput}
                value={text}
                placeholder="What needs to be done?"
                onChange={(e) => {setText(e.target.value)}}
                onKeyDown={handleKeyDown}
                onFocus={() => {setIsFocused(true)}}
                onBlur={() => {setIsFocused(false)}}
            />
        </div>
    );
};

export default Header;