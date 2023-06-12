import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/modules/redux/store/configureStore";
import {StatusFilters} from "@/modules/redux/store/slices/filtersSlice";

interface Todo {
    id: number;
    text: string;
    color: string;
    completed: boolean;
}

interface todoSliceState {
    entities: Todo[];
}


const initialState: todoSliceState = {
    entities: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.entities.push(action.payload)
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            let todo = state.entities.find((t, id) => id === action.payload);
            if(todo) todo.completed = !todo.completed;
        },
        selectTodoColor: {
            reducer(state, action: PayloadAction<{todoId: number, color: string}>) {
                const {todoId, color} = action.payload;
                state.entities[todoId].color = color;
            },
            prepare(todoId: number, color: string) {
                return {
                    payload: {todoId, color}
                }
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.entities = state.entities.filter((t, id) => id !== action.payload)
        },
        updateTodo: {
            reducer(state, action: PayloadAction<{todoId: number, text: string}>) {
                const {todoId, text} = action.payload;
                state.entities[todoId].text = text;
            },
            prepare(todoId: number, text: string) {
                return {
                    payload: {todoId, text}
                }
            }
        },
        completeAllTodos: (state) => {
            state.entities.forEach((todo) => {
                todo.completed = true;
            })
        },
        clearCompletedTodos: (state) => {
            let newArr: Todo[] = [];
            state.entities.forEach((todo) => {
                if(!todo.completed) newArr.push(todo);
            })
            state.entities = newArr;
        }
    }
})

export const {addTodo, toggleTodo, selectTodoColor, deleteTodo, updateTodo, completeAllTodos, clearCompletedTodos} = todoSlice.actions;

export default todoSlice.reducer;

export const selectTodos = (state: RootState) => state.todo.entities;

export const selectTodoById = (state: RootState, todoId: number) => {
    const entities = selectTodos(state);
    return entities[todoId];
}

export const selectTodoIds = createSelector(selectTodos, (todos) => {
    if(todos.length === 0) return [];
    return todos.map(t => t.id)
});

export const selectFilteredTodos = createSelector(
    selectTodos,
    (state: RootState) => state.filters,
    (todos, filters) => {
        const {status, colors} = filters;
        const shouldShowAll = status === StatusFilters.All;
        if(shouldShowAll && colors.length === 0) {
            return todos
        }
        const completedStatus = status === StatusFilters.Completed;
        return todos.filter((todo) => {
            const statusMatches = shouldShowAll || todo.completed === completedStatus;
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    }
)

export const selectFilteredTodosIds = createSelector(
    selectFilteredTodos,
    (todos) => todos.map(todo => todo.id)
)