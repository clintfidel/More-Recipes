import React, { Component } from 'react';
import { render } from 'react-dom';
class userProfile extends Component {
    // constructor(props) {
    //     super(props)
       
    // }
   
	
		
    render() {
        return (<div>
            <div className="navbar-wrapper">
            <div className="container-fluid">
                <nav className="navbar navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#"><i className="fa fa-th-list"></i> More Recipes</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">                        
                            <ul className="nav navbar-nav pull-right">
                                <li className=""><a href="user/index.html">User Dashboard</a> </li> 
                                <li className=""><a href="reviews.html">Top Recipes</a></li>
                                <li className=""><a href="user/index.html">Add  Recipe</a></li>
                                 <li className=""><a href="favourite.html">My Favourites</a></li>
                                <li className=""><a href="#">About</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div id="main">
            <img alt="User Pic" id ="User-image"src=
            "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
            id="profile-image1" className=
            "img-circle img-responsive" name=
            "profile-image1" /> 
            <input id=
            "profile-image-upload" className="visible" type=
            "file" />
            <ul>                               
                <li><span>First Name : </span> Fidelis</li>
                <li><span>Middle Name : </span> Clinton</li>
                <li><span>Last Name : </span> Chibugo</li>
                <li><span>Date Of Joining : </span>8th September 2017</li>
                <li><span>Date Of Birth : </span>8th August 2017</li>                                                           
                <li><span>Nationality : </span>Nigerian</li>
            </ul>
        </div>
        </div>)
    }
}
render(<userProfile />, document.getElementById('app'));