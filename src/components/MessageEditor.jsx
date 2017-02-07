var React = require('react');
import { addNote, setName } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { extractDomain } from '../utils/utils';

import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

require('./../css/MessageEditor.css');

const domain = extractDomain();

var MessageEditor = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleMessageAdd: function() {
      if (this.state.text.length > 0){
          var newMessage = {
              text: this.state.text,
              id: Date.now()
          };
          if (this.props.name){
            newMessage.name = this.props.name;
          }
          this.setState({ text: '' });
          this.props.firebase.push('/'+domain, newMessage);
      }
    },
    handleKeyPress: function(event) {
        if (event.key === 'Enter') {
            this.handleNoteAdd();
        }
    },
    handleEnterName: function(event){
      if (event.key === 'Enter') {
          this.props.setName(event.target.value);
      }
    },
    getName: function(){
      if (this.props.name.length > 0){
        return <label><strong>Your nick is: {this.props.name}</strong></label>
      } else {
        return (
          <input type="text"
                 className="textarea"
                 onKeyPress={this.handleEnterName}
                 placeholder="Your name" />
        )
      }
    },
    render: function() {
        return (
            <div className="note-editor">
                {this.getName()}
                <hr/>
                <textarea
                    placeholder="Enter your message here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button className="add-button" onClick={this.handleMessageAdd}>Send</button>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNote, setName }, dispatch);
}
const wrappedMessageEditor = firebaseConnect(['/'+domain])(MessageEditor)

export default connect((state) => state, mapDispatchToProps)(wrappedMessageEditor);