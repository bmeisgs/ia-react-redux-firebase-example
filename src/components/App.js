import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import List from './List';
import { useDispatch } from 'react-redux';
import EditItem from './EditItem';
import * as messageActions from '../actions/messages';
import * as todoActions from '../actions/todo';
import StatusMessage from './StatusMessage';

const neverChange = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('hello');
    dispatch(messageActions.PUSH_INFO('Please wait, loading store data'));
    dispatch(todoActions.TODO_LOAD());
    return () => {
      console.log('goodbye');
    };
  }, [neverChange, dispatch]);
  dispatch(messageActions.PUSH_INFO('Welcome!'));
  return (
    <BrowserRouter>
      <nav>
        <h2><Link to="/list">List</Link> || <Link to="/edit/0">Add item</Link></h2>
        <StatusMessage />
      </nav>
      <Switch>
        <Route path="/edit/:id" exact component={EditItem} />
        <Route path="/list" exact component={List} />
        <Route path="/" component={List} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
