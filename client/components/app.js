import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../components/Homepage/homepage.js'; 
import Login from '../components/login/login';
import Signup from '../components/signup/signup';
import Review from '../components/review/review';
import ProfilePage from '../components/profilePage/profilePage';
import RecipePage from '../components/RecipePage/recipe';
import FavoriteRecipe from '../components/Favourite/favouriteRecipes';
import ViewRecipe from '../components/viewRecipe/viewRecipe';
import PageNotFound from '../components/pageNotFound/pageNotFound';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
          <Route exact path = ',homepage' components = {Homepage} />
          <Route exact path='/signup' components={Signup} />
          <Route exact path='/login' components={Login} />
          <Route path='/recipe' components={RecipePage} />
          <Route path='/favoriterecipe' components={FavoriteRecipe} />
          <Route path='/review' components={Review} />
          <Route path='/profilepage' components={ProfilePage} />
          <Route path='/viewrecipe' components={ViewRecipe} />
          <Route path='*'component={PageNotFound} />
        </Switch>
        </div>
      </Router>
    );
  }
}