import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteTodo,
    selectTodoById,
    selectTodoColor,
    toggleTodo,
    updateTodo
} from "@/modules/redux/store/slices/todoSlice";
import {RootState} from "@/modules/redux/store/configureStore";
import styles from "@/styles/Todo.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {availableColors} from "@/modules/redux/utils/colors";
import {capitalize} from "@/helpers/capitalize";

interface TodoItemProps {
    id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({id}) => {
    const todo = useSelector((state: RootState) => selectTodoById(state, id));
    const {text, color, completed} = todo
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(text);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if(isEditing) inputRef.current?.focus()
    }, [isEditing])

    const toggleCompleted = () => {
        dispatch(toggleTodo(id))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const trimmedText = inputText.trim();
        if(e.key === 'Enter' && trimmedText) {
            dispatch(updateTodo(id, inputText))
            setIsEditing(false)
        }
    }

    const changeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(selectTodoColor(id, e.target.value))
    }

    const destroy = () => {
        dispatch(deleteTodo(id))
    }

    return (
        <div className={styles.card} style={{background: color}}>
            <div className={styles.left}>
                <div
                    onClick={toggleCompleted}
                    className={styles.circle}
                >
                    {completed && <FontAwesomeIcon className={styles.checkMark} icon={faCheck}/>}
                </div>
            </div>
            <div className={styles.content}>
                <textarea
                    ref={inputRef}
                    style={{color: isEditing ? 'black' : 'gray', borderColor: isEditing ? 'black' : 'gray'}}
                    className={styles.text}
                    value={inputText}
                    onChange={(e) => {setInputText(e.target.value)}}
                    disabled={!isEditing}
                    onKeyDown={handleKeyDown}
                />
                <div className={styles.right}>
                    <div className={styles.icons}>
                        <FontAwesomeIcon
                            className={styles.update}
                            onClick={() => {setIsEditing(prev => !prev)}}
                            style={{color: isEditing ? 'black' : 'gray'}}
                            icon={faPen}
                        />
                        <FontAwesomeIcon
                            className={styles.delete}
                            onClick={destroy}
                            icon={faTrash}
                        />
                    </div>
                    <select
                        className={styles.colorPicker}
                        value={color}
                        style={{color}}
                        onChange={changeColor}
                    >
                        <option value={""}/>
                        {availableColors.map(c =>
                            <option key={c} value={c} style={{color: c}}>
                                {capitalize(c)}
                            </option>
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;