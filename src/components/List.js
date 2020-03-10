import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';

const List = () => {
    const items = useSelector(state => state.todo.todos);
    const itemKeys = Object.keys(items);
    const listOfItems = itemKeys.map(itemKey => {
        const item = items[itemKey];
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
