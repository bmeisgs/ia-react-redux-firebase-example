import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as todoActions from '../actions/todo';

const EditItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const todo = useSelector((state) => {
        if (id === '0' || typeof state.todo.todos[id] === 'undefined') {
            return {
                id: '0',
                title: '',
                state: 'todo'
            };
        }
        return state.todo.todos[id];
    });

    const handleChange = (e) => {
        todo[e.target.name] = e.target.value;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.id === '0') {
            dispatch(todoActions.TODO_ADD(todoActions.todoParams(todo.title, todo.state)));
        } else {
            dispatch(todoActions.TODO_UPDATE(todo));
        }
        history.push('/list');
    };

    const handleCancel = (e) => {
        history.push('/list');
    }

    return(
        <div>
            <h3>Edit todo item</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" defaultValue={todo.title} placeholder="what to do?" onChange={handleChange} />
                <br />
                <select name="state" defaultValue={todo.state} onChange={handleChange}>
                    <option value="todo">still to do</option>
                    <option value="done">already done</option>
                </select>
                <br />
                <input type="submit" />
                <button onClick={handleCancel}>cancel</button>
            </form>
        </div>
        
    );
};

export default EditItem;
