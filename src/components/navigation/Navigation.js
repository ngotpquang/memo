import React, { Component } from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom';


class Navigation extends Component {
  constructor(props){
    super(props);
    let isLoggedIn = localStorage.getItem('userId');
    let username = localStorage.getItem('username');
    this.state = {
      isLoggedIn: isLoggedIn !== null ? isLoggedIn : false,
      username: username != null ? username : ""
    }
  }
  render() {
    if (this.state.isLoggedIn){
        return (<div>
            <div className="welcome"><span>Hello </span> 
                <b className="user-name">{this.state.username}</b><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Link to="/login"><button className="logout" onClick={this._logOut.bind(this)}>Logout</button></Link>
            </div>
            <div className="clear"></div>
        </div>
        );
    } else {
        return (
        <div>
            <div className="buttons">
                <Link to="/login">Login</Link> <span>or </span>
                <Link to="/sign-up"><button className="sign-up">Sign up</button></Link>
            </div>
            <div className="clear"></div>
        </div>
        );
    }
  }
  _logOut(){
      localStorage.removeItem('userId');
      this.setState({isLoggedIn: false});
    }
}


export default Navigation;
