import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectFilteredTodos, selectTodoIds, selectTodos} from "@/modules/redux/store/slices/todoSlice";
import TodoItem from "@/modules/redux/page/examples/todo/TodoItem";
import styles from "@/styles/Todo.module.scss";

const TodoList = () => {
    const todos = useSelector(selectFilteredTodos);

    return (
        <div className={styles.list}>
            {todos.map((todo, id) => <TodoItem id={id} key={todo.text + id}/>)}
        </div>
    );
};

export default TodoList;