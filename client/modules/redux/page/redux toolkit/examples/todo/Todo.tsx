import React from 'react';
import styles from "@/../../../../../../../server/styles/Todo.module.scss";
import Header from "@/modules/redux/page/redux toolkit/examples/todo/Header";
import TodoList from "@/modules/redux/page/redux toolkit/examples/todo/TodoList";
import Footer from "@/modules/redux/page/redux toolkit/examples/todo/Footer";
import {useSelector} from "react-redux";
import {selectTodos} from "@/modules/redux/store/slices/todoSlice";

const Todo = () => {
    const todos = useSelector(selectTodos)

    return (
        <div className={styles.exampleContainer}>
            <Header/>
            <TodoList/>
            {todos.length !== 0 && <Footer/>}
        </div>
    );
};

export default Todo;