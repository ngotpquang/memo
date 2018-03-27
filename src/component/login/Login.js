import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { login } from "../../action/userAction";

class Login extends React.Component {
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
            <p className="errMsg">{this.props.loginMessage}</p>
        </form>
      </div>
    );
  }

  _handleSubmit(event){
    event.preventDefault();
    const account = {
      username: this._username.value,
      password: this._password.value
    }
    login(account);
    setTimeout(() => {
      if (localStorage.getItem("username")){
        this.props.history.push("/");
      }
    }, 500);
  }
}
  
  export default Login;