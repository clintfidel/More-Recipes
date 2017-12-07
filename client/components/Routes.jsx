import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hompage from '../components/presentational/pages/Homepage';
import RecipePage from '../components/container/pages/UserDashboard';


const Routes = () => (
  <div>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Hompage} />
           <Route exact path="/recipes" component={RecipePage} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default Routes;
