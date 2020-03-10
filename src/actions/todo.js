import * as messageActions from './messages';
import * as commonActions from './common';

let currId = 0;
const TODO_COLLECTION_NAME = 'todos';

const collectionRef = (fbInstance) => {
    return commonActions.getMeADatabase(fbInstance).collection(TODO_COLLECTION_NAME);
}

export const TODO_LOAD = () => {
    return (dispatch, getState, fbInstance) => {
        collectionRef(fbInstance).get().then((data) => {
            const docs = [];
            data.forEach((docu) => {
                docs.push(docu.data());
            });
            dispatch({
                type: 'TODO_LOAD',
                payload: docs
            });
            dispatch( messageActions.PUSH_INFO('The remote storage backend is loaded.') );
        }).catch((e) => {
            collectionRef(fbInstance).add({ignore: true});
            console.log(e);
            dispatch( messageActions.PUSH_WARNING('Initializing remote storage') );
        });
    };
}

export const TODO_ADD = (stuff) => {
    return (dispatch, getState, fbInstance) => {
        collectionRef(fbInstance).doc(stuff.id).set({...stuff}).then(()=> {
            dispatch({
                type: 'TODO_ADD',
                payload: stuff
            });
            dispatch( messageActions.PUSH_INFO('Added new Todo with id ' + stuff.id.toString()) );
        }).catch((e) => {
            console.error(e);
            dispatch( messageActions.PUSH_ALERT('Remote storage is not adding the object!') );
        });
    };
};

export const TODO_UPDATE = (stuff) => {
    return (dispatch, getState, fbInstance) => {
        collectionRef(fbInstance).doc(stuff.id).update({...stuff}).then(()=> {
            dispatch({
                type: 'TODO_UPDATE',
                payload: stuff
            });
            dispatch( messageActions.PUSH_INFO('Updated Todo id ' + stuff.id.toString()) );
        }).catch((e) => {
            console.error(e);
            dispatch( messageActions.PUSH_ALERT('Remote storage is not updating the object!') );
        });
    };
}

export const TODO_REMOVE = (id) => {
    return (dispatch, getState, fbInstance) => {
        collectionRef(fbInstance).doc(id).delete().then(() => {
            dispatch({
                type: 'TODO_REMOVE',
                id
            });
            dispatch( messageActions.PUSH_WARNING('Removed Todo id ' + id.toString()) );
        }).catch((e) => {
            console.error(e);
            dispatch( messageActions.PUSH_ALERT('Remote storage is not deleting the object!') );
        });
    };
};

export const TODO_DONE = (id) => {
    return (dispatch, getState, fbInstance) => {
        console.log('trying to set done', id);
        collectionRef(fbInstance).doc(id).update({state: 'done'}).then(()=> {
            dispatch({
                type: 'TODO_DONE',
                id
            });
            dispatch( messageActions.PUSH_INFO('Changed Todo id ' + id.toString() + 'to done') );
        }).catch((e) => {
            console.error(e);
            dispatch( messageActions.PUSH_ALERT('Remote storage is not updating the object!') );
        });
    };
};

export const todoParams = (title, state = 'todo') => ({
    id: 'id' + ++currId,
    title,
    state
});
