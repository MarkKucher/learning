import React from 'react';
import {useSelector} from "react-redux";
import {selectFilteredTodos} from "@/modules/redux/store/slices/todoSlice";
import TodoItem from "@/modules/redux/page/redux toolkit/examples/todo/TodoItem";
import styles from "@/../../../../../../../server/styles/Todo.module.scss";

const TodoList = () => {
    const todos = useSelector(selectFilteredTodos);

    return (
        <div className={styles.list}>
            {todos.map((todo, id) => <TodoItem id={id} key={todo.text + id}/>)}
        </div>
    );
};

export default TodoList;