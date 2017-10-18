import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signup';
import Review from './pages/review';
import ProfilePage from './pages/profilePage';
import RecipePage from './pages/recipe';
import FavoriteRecipe from './pages/favouriteRecipes';
import ViewRecipe from './pages/viewRecipe';
import PageNotFound from './pages/pageNotFound';

const App = () => (
  <div>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" components={Homepage} />
          <Route exact path="/signup" components={Signup} />
          <Route exact path="/login" components={Login} />
          <Route path="/recipe" components={RecipePage} />
          <Route path="/favoriterecipe" components={FavoriteRecipe} />
          <Route path="/review" components={Review} />
          <Route path="/profilepage" components={ProfilePage} />
          <Route path="/viewrecipe" components={ViewRecipe} />
          <Route path="*"component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
