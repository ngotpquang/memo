import { connect } from "react-redux";
import MemoBox from "../component/memo-box/MemoBox";

const mapStateToProps = (state) => {
    return {
        userId: state.user.userId,
        memos: state.memos
    }
}

const MemoBoxContainer = connect(mapStateToProps) (MemoBox);
export default MemoBoxContainer;