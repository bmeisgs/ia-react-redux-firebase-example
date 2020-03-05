export const PUSH_MESSAGE = (message, messageType) => ({
    type: 'PUSH_MESSAGE',
    message,
    messageType
});

export const PUSH_WARNING = (message) => {
    return PUSH_MESSAGE(message, 'warning');
};

export const PUSH_INFO = (message) => {
    return PUSH_MESSAGE(message, 'info');
};

export const PUSH_ALERT = (message) => {
    return PUSH_MESSAGE(message, 'alert');
};

export const CLEAR_MESSAGE = () => ({
    type: 'CLEAR_MESSAGE'
});
