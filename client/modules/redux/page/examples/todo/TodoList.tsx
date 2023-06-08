import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectTodoIds} from "@/modules/redux/store/slices/todoSlice";
import TodoItem from "@/modules/redux/page/examples/todo/TodoItem";
import styles from "@/styles/Todo.module.scss";

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds);

    return (
        <div className={styles.list}>
            {todoIds.map(id => <TodoItem key={id} id={id}/>)}
        </div>
    );
};

export default TodoList;