import * as todoActions from '../actions/todo';

const defaultState = {
    todos: {}
};

export default (state = defaultState, action) => {
    let id;
    let newState;
    switch (action.type) {
        case 'TODO_LOAD':
            newState = {};
            action.payload.forEach(doc => {
                newState[doc.id] = {...doc};
            });
            return {
                ...state,
                todos: newState
            };
        case 'TODO_ADD':
            id = action.payload.id;
            return { 
                ...state,
                todos: {...state.todos, [id]: action.payload}
            };

        case 'TODO_UPDATE':
            id = action.payload.id;
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [id]: action.payload
                }
            };
        case 'TODO_REMOVE':
            id = action.id;
            newState = {...state, todos: {...state.todos}};
            delete newState.todos[id];
            return newState;
        case 'TODO_DONE':
            id = action.id;
            newState = {...state, todos: {...state.todos}};
            newState.todos[id].state = 'done';
            return newState;
        default:
            return { ...state };
    }
};
