import React, { Component } from 'react';
import Memo from '../memo/Memo.js';
import MemoForm from '../memo-form/MemoForm.js';
import $ from 'jquery';
import './MemoBox.css';

class MemoBox extends Component {
    constructor(props){
        super(props);
        let createdDate = new Date().getTime();
        let updatedDate = new Date().getTime();
        let userId = localStorage.getItem('userId');
        let memos = [];
        if (userId == null){
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
            userId: localStorage.getItem('userId'),
            memos: memos
        }
    }
    componentWillMount(){
        this._fetchMemo();
    }
    componentDidMount(){
        // this._timeInterval = setInterval(() => this._fetchMemo(), 3000);
        this._fetchMemo();
    }
    componentWillUnmount(){
        // clearInterval(this._timeInterval);
    }
    render() {
        let userId = this.state.userId;
        if (userId){
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
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/api/memo/user/id?userId=' + this.state.userId,
            success: (result) => {
                this.setState({
                    memos: result
                })
            },
            error: (error) => {
                // console.log(error);
            }
        })
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
        let memo = {
            userId: this.state.userId,
            title: title,
            content: content
        }
        console.log(memo);
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/api/memo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(memo),
            success: (result) => {
                console.log(result);
                this._fetchMemo();
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
  }
  
  export default MemoBox;