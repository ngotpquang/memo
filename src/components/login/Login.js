import React, { Component } from 'react';
import './Login.css';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: ''
    };
  }
  render() {
    return (
      <div className="login-form" >
        <h3>Login</h3>
        <form onSubmit={this._handleSubmit.bind(this)}>
            <input type="text" placeholder="Username" ref={(input) => this._username = input}/>
            <br />
            <input type="password" placeholder="Password" ref={(input) => this._password = input}/>
            <br />
            <p className="sign-up">Don't have account? <Link to="/sign-up" className="sign-up-link">Sign up</Link> a free one now!</p>
            <div className="button">
              <button type="submit" className="submit-button">Login</button>
              <button type="reset" className="clear-button">Clear</button>
            </div>
            <div className="clear"></div>
            <p className="errMsg">{this.state.errorMsg}</p>
        </form>
      </div>
    );
  }

  _handleSubmit(event){
    event.preventDefault();
    let username = this._username;
    let password = this._password;
    this._login(username.value, password.value);
  }

  _login(username, password){
    let info = {
      username: username,
      password: password
    }
    $.ajax({
      method: 'POST',
      url: 'http://localhost:8080/api/uzer/login',
      data: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      },
      success: (result) => {
        if (result && result.id != null){
          localStorage.setItem("userId", result.id);
          localStorage.setItem("username", result.username);
          this.setState({
            errorMsg: "",
            isLoggedIn: true
          });
          this.props.history.push("/");
          window.location.reload();
        }
      },
      error: (msg) => {
        this.setState({
          errorMsg: "Wrong username/password. Please try again or sign up new account."
        });
        $('input')[0].focus();
      }
    })
  }
}
  
  export default Login;