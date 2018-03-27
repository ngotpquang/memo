import React, { Component } from 'react';
import './MemoForm.css';
import $ from 'jquery';

class MemoForm extends Component {
    render() {
      return (
        <form className="memo-form" onSubmit={this._handleSubmit.bind(this)}>
            <input className="memo-title" id="title" 
                placeholder="Title" ref={(input) => this._title = input}
                onKeyUp={this._toggleSubmitButton.bind(this)}/>
            <br />
            <textarea className="memo-content" id="content" rows="10" placeholder="Content"
                ref={(textarea) => this._content = textarea}
                onKeyUp={this._toggleSubmitButton.bind(this)}></textarea>
            <br />
            <button id="submit" type="submit">Add</button>
            <div className="clear"></div>
        </form>
      );
    }

    componentDidMount(){
        this._toggleSubmitButton();
    }

    _toggleSubmitButton(){
        let title = $('#title').val();
        let content = $('#content').val();
        if ((title !== undefined && content !== undefined) && (title !== '' || content !== '')){
            $('#submit').slideDown(500);
        } else {
            $('#submit').slideUp(500);
        }
    }

    _handleSubmit(event){
        event.preventDefault();
        let title = this._title;
        let content = this._content;
        this.props.addMemo(title.value, content.value);
        title.value = '';
        content.value = '';
        this._toggleSubmitButton();
    }
  }
  
  export default MemoForm;