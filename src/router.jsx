import React from 'react';

import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import IndividualDisplay from './Individual';
import ListView from './List';

function Router() {
  return (
    <BrowserRouter>
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
      <Switch>
        <Route path="/:id">
          <IndividualDisplay />
        </Route>
        <Route path="/">
          <ListView />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
