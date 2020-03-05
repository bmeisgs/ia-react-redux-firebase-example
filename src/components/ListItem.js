import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import * as todoActions from '../actions/todo';

const ListItem = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const goToEdit = (e) => {
        e.preventDefault();
        history.push(`/edit/${props.id}`);
    };
    const markDone = (e) => {
        e.preventDefault();
        dispatch(todoActions.TODO_DONE(props.id));
    };
    return (
        <li>{props.title}, {props.state} <button onClick={goToEdit}>edit</button> <button onClick={markDone}>done</button></li>
    );
};

export default ListItem;
