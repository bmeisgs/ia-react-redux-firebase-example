import * as todoActions from '../actions/todo';

const defaultState = {
    todos: [
        todoActions.todoParams('Example 1'),
        todoActions.todoParams('Example 2')
    ]
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TODO_ADD':
            return { 
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'TODO_UPDATE':
            return {
                ...state,
                todos: state.todos.map((item) =>
                    (item.id === action.payload.id) ? action.payload : item
                )
            };
        case 'TODO_REMOVE':
            return {
                ...state,
                todos: state.todos.filter((item) => 
                    item.id !== action.id
                )
            };
        case 'TODO_DONE':
            return {
                ...state,
                todos: state.todos.map((item) => { 
                    const newItem = {...item};
                    if (item.id === action.id) {
                        newItem.state = 'done';
                    }
                    return newItem;
                })
            };
            default:
            return { ...state };
    }
};
