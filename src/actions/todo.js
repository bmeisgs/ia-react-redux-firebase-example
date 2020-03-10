import * as messageActions from './messages';
import * as commonActions from './common';

let currId = 0;
const TODO_COLLECTION_NAME = 'todos';

const collectionRef = (fbInstance) => {
    return commonActions.getMeADatabase(fbInstance).collection(TODO_COLLECTION_NAME);
}

/**
 * Action creators that use firebase need to create a thunk function, 
 * as they require the use of async operations, and thus, promises.
 * Actually, action creators here are doing the following:
 * 1. Manage firestore CRUD operation.
 * 2. Dispatch actual action that updates the local store.
 * 
 * Caveats:
 * - only single user operations are allowed as there is no sync from
 *   the firestore collections. A read sync is done on startup in the
 *   TODO_LOAD operation, and that's it.
 * - id's are assigned here instead of letting firebase create them.
 */

export const TODO_LOAD = () => {
    return (dispatch, getState, fbInstance) => {
        collectionRef(fbInstance).get().then((data) => {
            const docs = [];
            data.forEach((docu) => {
                const d = docu.data();
                // Filter out the "blank document" that was used to initialize the collection.
                if (d.id !== 'id0') {
                    docs.push(d);
                    // This is so that when we create new TODOs after a sync, we start with unused IDs.
                    const idNum = parseInt(d.id.substr(2));
                    if (idNum > currId) {
                        currId = idNum;
                    }
                }
            });
            // Once all documents are loaded in, it dispatches the action to fill up the local store.
            // It could be done with a series of TODO_ADD actions, but that would trigger a repaint
            // for the list component every time a document is added.
            dispatch({
                type: 'TODO_LOAD',
                payload: docs
            });
            dispatch( messageActions.PUSH_INFO('The remote storage backend is loaded.') );
        }).catch((e) => {
            // This is a blank "document" used to initialize the collection if it's necessary.
            collectionRef(fbInstance).add({id: 'id0', ignore: true});
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
