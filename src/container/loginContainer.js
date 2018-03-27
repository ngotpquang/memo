import { connect } from "react-redux";
import Login from "../component/login/Login";

const mapStateToProps = (state) => {
    return {
        loginMessage: state.user.message
    }
}

const LoginContainer = connect(mapStateToProps) (Login);
export default LoginContainer;