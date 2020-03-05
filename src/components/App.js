import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import List from './List';
import { useDispatch } from 'react-redux';
import EditItem from './EditItem';
import * as messageActions from '../actions/messages';
import StatusMessage from './StatusMessage';

function App() {
  const dispatch = useDispatch();
  dispatch(messageActions.PUSH_INFO('Welcome!'));
  return (
    <BrowserRouter>
      <nav>
        <Link to="/list">List</Link> || <Link to="/edit/0">Add item</Link>
        <br/>
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
