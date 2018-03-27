import React from 'react';
import './Home.css';
import LoginContainer from "../../container/loginContainer";
import SignUpContainer from '../../container/signUpContainer';
import MemoBoxContainer from "../../container/memoBoxContainer";
import { Route, Switch, withRouter}  from 'react-router-dom';


class Home extends React.Component {
  render() {
    return (
        <div className="home">
            <Switch>
                <Route exact path='/' component={MemoBoxContainer}></Route>
                <Route exact path='/login' component={LoginContainer}></Route>
                <Route exact path='/sign-up' component={SignUpContainer}></Route>
            </Switch> 
        </div>
    );
  }
}

export default withRouter(Home);
