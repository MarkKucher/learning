import React from 'react';
import styles from "@/styles/Todo.module.scss";
import Header from "@/modules/redux/page/examples/todo/Header";
import TodoList from "@/modules/redux/page/examples/todo/TodoList";
import Footer from "@/modules/redux/page/examples/todo/Footer";

const Todo = () => {

    return (
        <div className={styles.exampleContainer}>
            <Header/>
            <TodoList/>
            <Footer/>
        </div>
    );
};

export default Todo;