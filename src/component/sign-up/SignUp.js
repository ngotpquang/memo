import React, { Component } from 'react';
import './SignUp.css';
import { signUp } from "../../action/userAction";

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: ""
    }
  }
  render() {
    return (
      <div className="login-form" >
        <h3>Sign up</h3>
        <form onSubmit={this._handleSubmit.bind(this)}>
            <input type="text" placeholder="Username" ref={(input) => this._username = input}/>
            <br />
            <input type="password" placeholder="Password" ref={(input) => this._password = input}/>
            <br />
            <input type="password" placeholder="Retype password" ref={(input) => this._rePassword = input}/>
            <br />
            <div className="button">
              <button type="submit" className="submit-button">Sign up</button>
            </div>
            <div className="clear"></div>
            <p className="errMsg">{ this.state.errorMessage !== "" ? this.state.errorMessage : (this.props.signUpMessage ? this.props.signUpMessage : "") }</p>
        </form>
      </div>
    );
  }

  _handleSubmit(event){
    event.preventDefault();
    this.setState({errorMessage: ""});
    const username = this._username;
    const password = this._password;
    const rePassword = this._rePassword;
    if ("" === username.value || "" === password.value || "" === rePassword.value){
      this.setState({errorMessage: "Please enter all three username, password and retype password fields."});
    } else {
      if (password.value !== rePassword.value){
        this.setState({errorMessage: "Passwords don't match. Please try again."});
      } else {
        const account = {
          username: username.value,
          password: password.value
        }
        signUp(account);
      }
    }
  }
}
  
  export default SignUp;