var React = require('react');
var Message = require('./Message.jsx');

import { initTodo } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { extractDomain } from '../utils/utils'

import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

require('./../css/MessageLayout.css');

const domain = extractDomain();

var MessageLayout = React.createClass({
    defaultProps: {
        notes: []
    },
    componentDidMount: function() {
        this.props.initTodo();
    },
    showName: function(message){
      return message.name ? <div><strong>{message.name}</strong><hr/></div> : '';
    },
    render: function() {
        var {messages, selected} = this.props,
            max_id = null,
            min_id = null,
            me = this,
            before_selected = null;
        if (!isEmpty(messages)){
          max_id = Math.max.apply(null, Object.keys(messages).map(function(o){return messages[o].id;}));
          min_id = Math.min.apply(null, Object.keys(messages).map(function(o){return messages[o].id;}));
        }
        if (selected.id){
          before_selected = Math.max.apply(Math, Object.keys(messages).map(function(o){
                return messages[o].id < selected.id ? messages[o].id : 0;
              }));
        }

        return (
            <div className="notes-grid columns" ref="grid">
                {!isLoaded(messages) ?
                    'Loading' : isEmpty(messages) ? 'No messages yet':
                    Object.keys(messages).map(function(key, id){
                        return (
                            <Message
                                key={key}
                                color={messages[key].color}
                                max_id={max_id}
                                min_id={min_id}
                                before_selected={before_selected}
                                id={messages[key].id}>
                                {me.showName(messages[key])}
                                {messages[key].text}
                            </Message>
                        );
                    })
                }
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        selected: state.selected,
        messages: dataToJS(state.firebase, '/'+domain),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ initTodo }, dispatch);
}

const wrappedMessageLayout = firebaseConnect(['/'+domain])(MessageLayout)

export default connect(mapStateToProps, mapDispatchToProps)(wrappedMessageLayout);