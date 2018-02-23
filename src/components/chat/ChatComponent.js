require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ChatSource from './ChatSource';
import LoaderComponent from '../loader/LoaderComponent';

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mounted: false
        };
    }

    componentDidMount() {
        return (
            ChatSource.get()
                .then((responseJson) => {
                    let data = Array.prototype.concat.apply([], responseJson);
                    this.setState({ data: data, mounted: true });
                })
                .catch((error) => {
                    console.error(error);
                })
        )
    }

    render() {
        
        let messages = this.state.data.map((v, i) => {
        
            return (
                <ReactCSSTransitionGroup
                    key={i}
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000}
                >
                    {this.renderChatLine(v.name, v.words, v.region)}
                </ReactCSSTransitionGroup>
            )
        })

        let content = <LoaderComponent />;
        if (this.state.mounted) {
            content = (
                <ReactCSSTransitionGroup
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000} >
                    <div className="chat-component component col-xs-12 col-sm-6">
                        <div className="box">
                            <div className="header col-xs-12 text-center">
                                <i className="fa fa-comments-o"></i>
                                <span className="box-title">House Words</span>
                            </div>
                            <div id="chat-messages" className="chat-messages col-xs-12">{messages}</div>
                            
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }

    renderChatLine(userName,  message, time) {
       
        return (
            <div className={'line'}>
                
                <div className="message">
                    <div className="user-info">
                        <span className="user-name">{userName}</span>
                    </div>
                    <div className="user-from">
                        <span className="time">from {time}</span>
                    </div>
                    <p className="user-message">
                        "{message}"
                    </p>
                </div>
            </div>
        );
    }




}

module.exports = ChatComponent;