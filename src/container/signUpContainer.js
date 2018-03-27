import { connect } from "react-redux";
import SignUp from "../component/sign-up/SignUp";

const mapStateToProps = (state) => {
    return {
        signUpMessage: state.user.message
    }
}

const SignUpContainer = connect(mapStateToProps) (SignUp);
export default SignUpContainer;