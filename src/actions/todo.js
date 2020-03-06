import * as messageActions from './messages';

export const TODO_ADD = (stuff) => {
    return (dispatch, getState, fbInstance) => {
        console.log(fbInstance);
        const db = fbInstance().firestore();
        console.log(db);
        const sampledb = db.collection('sample');
        console.log(sampledb);
        sampledb.get().then((data)=> {
            console.log(data);
            dispatch({
                type: 'TODO_ADD',
                payload: stuff
            });
            dispatch( messageActions.PUSH_INFO('Added new Todo with id ' + stuff.id.toString()) );
        }).catch((e) => {
            console.error(e);
            dispatch({
                type: 'TODO_ADD',
                payload: stuff
            });
            dispatch( messageActions.PUSH_INFO('Added new Todo with id ' + stuff.id.toString()) );
        })
    };
};

export const TODO_UPDATE = (stuff) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TODO_UPDATE',
            payload: stuff
        });
        dispatch( messageActions.PUSH_INFO('Updated Todo id ' + stuff.id.toString()) );
    };
}

export const TODO_REMOVE = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TODO_REMOVE',
            id
        });
        dispatch( messageActions.PUSH_WARNING('Removed Todo id ' + id.toString()) );
    };
};

export const TODO_DONE = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TODO_DONE',
            id
        });
        dispatch( messageActions.PUSH_INFO('Changed Todo id ' + id.toString() + 'to done') );
    };
};

let currId = 0;

export const todoParams = (title, state = 'todo') => ({
    id: ++currId,
    title,
    state
});
