import React, { Component } from 'react';
import './SignUp.css';
import $ from 'jquery';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      errMsg: ""
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
            <p className="errMsg">{this.state.errMsg}</p>
        </form>
      </div>
    );
  }

  _handleSubmit(event){
    event.preventDefault();
    let username = this._username;
    let password = this._password;
    let rePassword = this._rePassword;
    if ("" === username.value || "" === password.value || "" === rePassword.value){
      this.setState({errMsg: "Please enter all three username, password and retype password fields."});
    } else {
      if (password.value !== rePassword.value){
        this.setState({errMsg: "Passwords don't match. Please try again."});
      } else {
        let info = {
          username: username.value,
          password: password.value
        }
        $.ajax({
          method: 'POST',
          url: 'http://localhost:8080/api/uzer/signup',
          data: JSON.stringify(info),
          headers:{
            'Content-Type': 'application/json'
          },
          success: (result) => {
            console.log(result);
            this.props.history.push("/");
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    }
    
  }
}
  
  export default SignUp;