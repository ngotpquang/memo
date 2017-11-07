import React, { Component } from 'react';
import './Memo.css';
import $ from 'jquery';

class Memo extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors: ['#c0392b', '#16a085', '#2c3e50'],
    }
  }
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
              onClick={this._editMemo.bind(this)}>
              <div className="modal-header">
                <span className="close" onClick={this._closeModal.bind(this)}>&times;</span>
                <div className="memo-title">{this.props.title}</div>
              </div>
              <div className="modal-body">
                <div className="memo-content">
                  {this.props.content}
                </div>
                <div className="memo-created-date">{this.props.createdDate}</div>
              </div>
              <div className="tooltip" id={idToolTip}>Click to edit</div>
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
      memoElement.css('background-color', randomColor);
      modal.css('background-color', randomColor);
    }

    _displayModal(){
      let saveButton = $('#modal-content' +  this.props.id + ' .save-button');
      saveButton.hide();      
      let input = $('#title-input-' + this.props.id);
      let textareaContent = $('#content-input-' + this.props.id);
      if (input.html() !== undefined){
        let memoTitle = $('#modal-content' +  this.props.id + ' .memo-title');
        let memoContent = $('#modal-content' +  this.props.id + ' .memo-content');
        memoTitle.show();
        memoContent.show();
        input.hide();
        textareaContent.hide();
      }
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
        let input = $('#title-input-' + this.props.id);
        let memoTitle = $('#modal-content' +  this.props.id + ' .memo-title');
        let memoContent = $('#modal-content' +  this.props.id + ' .memo-content');
        let tooltip = $('#tooltip' +  this.props.id);
        tooltip.slideUp(500);
        let randomColor = this.state.colors[this.props.id % 3];
        let modalHeader = $('#modal-content' +  this.props.id + ' .modal-header');
        if (input.html() === undefined){
          memoTitle.hide();
          memoContent.hide();
          let content = memoContent.html();
          let title = memoTitle.html();
          let inputTitle = '<input id="title-input-' + this.props.id + '" class="title" type="text" value="' + title + '" style="background-color:' + randomColor + '" />';
          let textareaContent = '<textarea id="content-input-' + this.props.id + '" class="content" style="background-color:' + randomColor + '">' + content + '</textarea>';
          modalHeader.append(inputTitle);
          modalHeader.append(textareaContent);
          saveButton.slideDown(500);
          saveButton.css('color', randomColor);
        } else {
          memoTitle.hide();
          memoContent.hide();
          let textareaContent = $('#content-input-' + this.props.id);
          input.show(500);
          textareaContent.show();
          saveButton.slideDown();
        }
        input.focus();
      }
    }

    _displayTooltip(){
      let isLoggedIn = localStorage.getItem('userId') !== null;
      if (isLoggedIn){
        let input = $('#title-input-' + this.props.id);
        if (input.html() === undefined || input.css('display') === 'none'){
          let modal = $('#tooltip' +  this.props.id);
          modal.slideDown(500);
        }
      }
    }

    _hideTooltip(){
      let isLoggedIn = localStorage.getItem('userId') !== null;
      if (isLoggedIn){
        let input = $('#title-input-' + this.props.id);
        if (input.html() === undefined || input.css('display') === 'none'){
          let modal = $('#tooltip' +  this.props.id);
          modal.slideUp(500);
        }
      }
    }

    _updateMemo(){
      let title = $('#title-input-' + this.props.id).val();
      let content = $('#content-input-' + this.props.id).val();
      let id = this.props.id;
      let userId = localStorage.getItem("userId");
      let data = { title, content, id, userId };
      console.log(data);
      $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/api/memo/edit',
        data: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        },
        success: (result) => {
          // console.log(result);
          this._closeModal();
          // window.location.reload();
          this.props.isUpdated();
        },
        error: (error) => {
          // TODO: Display error msg
          // console.log(error);
        }
      })
    }
  }
    
    export default Memo;