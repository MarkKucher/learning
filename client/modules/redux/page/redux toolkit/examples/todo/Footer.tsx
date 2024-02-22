import React from 'react';
import styles from '@/../../../../../../../server/styles/Todo.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    changeColorFilter,
    changeStatusFilter,
    selectFilters,
    StatusFilters
} from "@/modules/redux/store/slices/filtersSlice";
import {availableColors} from "@/modules/redux/utils/colors";
import {capitalize} from "@/helpers/capitalize";
import {clearCompletedTodos, completeAllTodos, selectTodos} from "@/modules/redux/store/slices/todoSlice";

const Footer = () => {
    const {colors, status} = useSelector(selectFilters);
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearCompletedTodos())
    }

    const complete = () => {
        dispatch(completeAllTodos())
    }

    const setStatus = (status: StatusFilters) => {
        return () => {
            dispatch(changeStatusFilter(status))
        }
    }

    return (
        <div className={styles.footer}>
            <h3 className={styles.todosLeft}>Amount of todos: {todos.length}</h3>
            <div className={styles.buttons}>
                <button onClick={clear}>Clear completed</button>
                <button onClick={complete}>Complete all</button>
            </div>
            <div className={styles.options}>
                {Object.values(StatusFilters).map(value =>
                    <div
                        style={{borderColor: status === value ? 'dodgerblue' : 'gray', color: status === value ? 'dodgerblue' : 'gray'}}
                        className={styles.option}
                        onClick={setStatus(value)}
                    >
                        {capitalize(value)}
                    </div>
                )}
            </div>
            <ul className={styles.colors}>
                <div>
                    {availableColors.map(c =>
                        <li className={styles.color}>
                            <input
                                type={"checkbox"}
                                checked={colors.includes(c)}
                                value={c}
                                onClick={() => {dispatch(changeColorFilter(c))}}
                            />
                            <h3 style={{color: c}}>{c}</h3>
                        </li>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Footer;