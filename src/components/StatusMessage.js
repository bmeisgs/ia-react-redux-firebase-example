import React, { useEffect } from 'react';
import * as messageActions from '../actions/messages';
import { useSelector, useDispatch } from 'react-redux';
import './StatusMessage.css';

const fadeOutTimes = {
    info: 2000,
    warning: 5000,
    alert: 5000
};

let removeTimer = null;

const StatusMessage = () => {
    const dispatch = useDispatch();
    const q = useSelector(state => state.messages.queue);
    // useEffect(() => {
    //     return () => {
    //         console.log('removeEffect');
    //         if (removeTimer !== null) {
    //             clearTimeout(removeTimer);
    //             removeTimer = null;
    //         }
    //     };
    // }, [q.length])

    if (q.length === 0) {
        return(
            <div></div>
        )
    }

    let { message, type } = q[0];

    if (!fadeOutTimes[type]) {
        type = 'info';
    }
    removeTimer = setTimeout(() => {
        removeTimer = null;
        dispatch(messageActions.CLEAR_MESSAGE());
    }, fadeOutTimes[type]);

    const classNames = 'statusMessage ' + type;

    return (
        <div className={classNames}>{message}</div>
    );
};

export default StatusMessage;
