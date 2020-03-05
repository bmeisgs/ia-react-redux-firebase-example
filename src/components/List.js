import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';

const List = () => {
    const items = useSelector(state => state.todo.todos);

    const listOfItems = items.map(item => {
        return (
            <ListItem key={item.id} {...item} />
        )
    });
    return (
        <ul>
            {listOfItems}
        </ul>
    )
};

export default List;
