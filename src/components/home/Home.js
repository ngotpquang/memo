import React, { Component } from 'react';
import './Home.css';
import MemoBox from '../memo-box/MemoBox';
import Login from '../login/Login';
import SignUp from '../sign-up/SignUp';
import {Route, Switch, withRouter} from 'react-router-dom';


class Home extends Component {
  render() {
    return (
        <div className="home">
            <Switch>
                <Route exact path='/' component={MemoBox}></Route>
                <Route exact path='/login' component={Login}></Route>
                <Route exact path='/sign-up' component={SignUp}></Route>
            </Switch> 
        </div>
    );
  }
}

export default withRouter(Home);
