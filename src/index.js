import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import fbConfig from './configs/fb';
import todosReducer from './reducers/todo';
import messagesReducer from './reducers/messages';
import thunk from 'redux-thunk';

firebase.initializeApp(fbConfig);

const rootReducer = combineReducers({
    'todo': todosReducer,
    'messages': messagesReducer
});

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);

const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    // createFirestoreInstance // <- needed if using firestore
};
  

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
