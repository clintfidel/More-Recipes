import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hompage from '../components/presentational/pages/Homepage';


const Routes = () => (
  <div>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Hompage} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default Routes;
