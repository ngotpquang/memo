import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../action/userAction";


class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({username: nextProps.username});
    }
    render() {
        if (this.state.username && this.state.username !== ""){
            return (<div>
                <div className="welcome"><span>Hello </span> 
                    <b className="user-name">{this.state.username}</b>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Link to="/login">
                        <button className="logout" onClick={this._logOut.bind(this)}>Logout</button>
                    </Link>
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
        logout();
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

const NavigationContainer = connect(mapStateToProps) (Navigation);

export default NavigationContainer;
