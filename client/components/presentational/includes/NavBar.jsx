import React from 'react';

const NavBar = () => (
  <div>
    <div className="navbar-wrapper">
      <div className="container-fluid">
        <nav className="navbar navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href=" "><i className="fa fa-th-list" /> Test page</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav pull-right">
                <li className="">
                  <a href="user/index.html">User Dashboard</a>
                </li>
                <li className="">
                  <a href="reviews.html">Top Recipes</a>
                </li>
                <li className="">
                  <a href="user/index.html">Add Recipe</a>
                </li>
                <li className="">
                  <a href="favourite.html">My Favourites</a>
                </li>
                <li className="">
                  <a href=" ">About</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default NavBar;
