import React, { Component } from 'react';
import Memo from '../memo/Memo.js';
import MemoForm from '../memo-form/MemoForm.js';
import './MemoBox.css';
import { fetchMemo, addMemo } from "../../action/memoAction";

class MemoBox extends Component {
    constructor(props){
        super(props);
        const createdDate = new Date().getTime();
        const updatedDate = new Date().getTime();
        const username = localStorage.getItem('username');
        let memos = [];
        if (!username){
            memos = [
                {id: 1, title: "Let's make it awesome", content: "You're gonna be on top", 
                createdDate: createdDate, updatedDate: updatedDate},
                {id: 2, title: "Let's make it awesome", content: "You're gonna be on top", 
                createdDate: createdDate, updatedDate: updatedDate},
                {id: 3, title: "Let's make it awesome", content: "You're gonna be on top", 
                createdDate: createdDate, updatedDate: updatedDate},
                {id: 4, title: "Let's make it awesome", content: "You're gonna be on top", 
                createdDate: createdDate, updatedDate: updatedDate},
                {id: 5, title: "Let's make it awesome", content: "You're gonna be on top", 
                createdDate: createdDate, updatedDate: updatedDate}
            ];
        }
        this.state = {
            isUpdated: false,
            memos: memos.length > 0 ? memos : this.props.memos
        }
    }
    // componentWillMount(){
    //     this._fetchMemo();
    // }
    componentDidMount(){
        this._fetchMemo();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.memos.length !== this.props.memos.length) {
            this.setState({memos: nextProps.memos});
        }
    }
    render() {
        let userId = this.props.userId;
        if (userId !== -1){
            return (
              <div className="memo-box">
                  <MemoForm addMemo={this._addMemo.bind(this)} />
                  <div className="memos">
                      {this._displayMemo()}
                  </div>
              </div>
            );
        } else {
            return (
                <div className="memo-box">
                    <div className="memos">
                        {this._displayMemo()}
                    </div>
                </div>
              );
        }
    }
    _fetchMemo(){
        fetchMemo(this.props.userId);
    }

    _displayMemo(){
        return this.state.memos.map((memo) => {
            let createdDate = new Date(memo.createdDate);
            let createdDateString = createdDate.toLocaleDateString() + " " 
                + createdDate.toLocaleTimeString().slice(0, createdDate.toLocaleTimeString().lastIndexOf(':'));
            let updatedDateString = "";
            if (memo.updatedDate !== null){
                let updatedDate = new Date(memo.updatedDate);
                updatedDateString = updatedDate.toLocaleDateString() + " " 
                + updatedDate.toLocaleTimeString().slice(0, updatedDate.toLocaleTimeString().lastIndexOf(':'));;
            } 
            return <Memo isUpdated={this._fetchMemo.bind(this)} 
            title={memo.title} content={memo.content} 
            key={memo.id} createdDate={createdDateString} id={memo.id}
            updatedDate={updatedDateString}/>
        })
    }

    _addMemo(title, content){
        const memo = {
            userId: this.props.userId,
            title: title,
            content: content
        }
        addMemo(memo);
        setTimeout(() => {
            this._fetchMemo();
        }, 500);
    }
  }
  
  export default MemoBox;