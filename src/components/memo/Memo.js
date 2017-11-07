import React, { Component } from 'react';
import './Memo.css';
import $ from 'jquery';
import TextareaAutosize from 'react-autosize-textarea';

class Memo extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors: ['#c0392b', '#16a085', '#2c3e50'],
    }
  }
  // onClick={this._editMemo.bind(this)}
    render() {
      let idModal = "modal" + this.props.id;
      let idModalContent = "modal-content" + this.props.id;
      let idToolTip = "tooltip" + this.props.id;
      return (
        <div onKeyUp={this._closeModalEsc.bind(this)} tabIndex="0">
          <div className="memo" id={this.props.id} onClick={this._displayModal.bind(this)}>
            <div className="memo-title">{this.props.title}</div>
            <div className="memo-content">{this.props.content}</div>
            <div className="memo-created-date">{this.props.createdDate}</div>
          </div>
          <div className="modal" id={idModal}>
            <div className="modal-content" id={idModalContent} 
              onMouseOver={this._displayTooltip.bind(this)}
              onMouseLeave={this._hideTooltip.bind(this)}
              onDoubleClick={this._editMemo.bind(this)}
              >
              <div className="modal-header">
                <span className="close" onClick={this._closeModal.bind(this)}>&times;</span>
                <input type="text" className="memo-title" defaultValue={this.props.title} disabled/>
              </div>
              <div className="modal-body">
                <TextareaAutosize className="memo-content" rows={10} maxRows={15}  defaultValue={this.props.content} disabled>
                </TextareaAutosize>
                <div className="memo-created-date">{this.props.createdDate}</div>
              </div>
              <div className="tooltip" id={idToolTip}>Double click to edit</div>
              <button className="save-button" onClick={this._updateMemo.bind(this)}>Save</button>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      );
    }
    componentDidMount(){
      // let colors = ['#c0392b', '#16a085', '#2c3e50'];
      let randomColor = this.state.colors[this.props.id % 3];
      let memoElement = $('#' + this.props.id);
      let modal = $('#modal-content' +  this.props.id);
      // let modalHeader = $('#modal-content' +  this.props.id + ' .modal-header');
      let memoTitleInput = $('#modal-content' +  this.props.id + ' .memo-title');
      let memoContentTextArea = $('#modal-content' +  this.props.id + ' .memo-content');
      // let modalBody = $('#modal-content' +  this.props.id + ' .modal-body');
      memoElement.css('background-color', randomColor);
      memoTitleInput.css('background-color', randomColor);
      modal.css('background-color', randomColor);
      let color1 = "rgba(255, 255, 255, 0.1)";
      memoContentTextArea.css('background-color', color1);
    }

    _displayModal(){
      let saveButton = $('#modal-content' +  this.props.id + ' .save-button');
      saveButton.hide();      
      let memoTitle = $('#modal-content' +  this.props.id + ' .memo-title');
      let memoContent = $('#modal-content' +  this.props.id + ' .memo-content');
      memoTitle.attr("disabled", true);
      memoContent.attr("disabled", true);
      let modal = $('#modal' +  this.props.id);
      modal.slideDown(500);
    }

    _closeModal(){
      let modal = $('#modal' +  this.props.id);
      modal.slideUp(500);
    }

    _closeModalEsc(event){
      if (event.keyCode === 27){
        this._closeModal();
      }
    }

    _editMemo(){
      let isLoggedIn = localStorage.getItem('userId') !== null;
      let saveButton = $('#modal-content' +  this.props.id + ' .save-button');
      if (isLoggedIn){
        let memoTitle = $('#modal-content' +  this.props.id + ' .memo-title');
        let memoContent = $('#modal-content' +  this.props.id + ' .memo-content');
        memoTitle.removeAttr("disabled");
        memoTitle.focus();
        memoContent.removeAttr("disabled");
        let tooltip = $('#tooltip' +  this.props.id);
        tooltip.slideUp(500);
        saveButton.slideDown(500);
      }
    }

    _displayTooltip(){
      let isLoggedIn = localStorage.getItem('userId') !== null;
      if (isLoggedIn){
        let memoTitle = $('#modal-content' +  this.props.id + ' .memo-title').attr("disabled");
        if (memoTitle !== undefined){
          let modal = $('#tooltip' +  this.props.id);
          modal.slideDown(500);
        }
      }
    }

    _hideTooltip(){
      let isLoggedIn = localStorage.getItem('userId') !== null;
      if (isLoggedIn){
        let memoTitle = $('#modal-content' +  this.props.id + ' .memo-title').attr("disabled");
        if (memoTitle !== undefined){
          let modal = $('#tooltip' +  this.props.id);
          modal.slideUp(500);
        }
      }
    }

    _updateMemo(){
      let title = $('#modal-content' +  this.props.id + ' .memo-title').val();
      let content = $('#modal-content' +  this.props.id + ' .memo-content').val();
      let id = this.props.id;
      let userId = localStorage.getItem("userId");
      let data = { title, content, id, userId };
      $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/api/memo/edit',
        data: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        },
        success: (result) => {
          this._closeModal();
          this.props.isUpdated();
        },
        error: (error) => {
          // TODO: Display error msg
          // console.log(error);
        }
      });
    }
  }
    
    export default Memo;