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
          List View
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
