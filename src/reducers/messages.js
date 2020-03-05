const defaultState = {
    queue: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'PUSH_MESSAGE':
            return {
                ...state,
                queue: [...state.queue, {
                    message: action.message,
                    type: action.messageType
                }]
            };
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                queue: (state.queue.length > 0) ? state.queue.slice(1) : []
            };
        default:
            return { ...state };
    }
};
