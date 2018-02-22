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
                    this.setState({ data: responseJson, mounted: true });
                    this.scrollMessageBox();
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
                    {this.renderChatLine(v.userName, v.portrait, v.message, v.displayPortraitLeft, v.time)}
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
                    <div className="chat-component component col-xs-12">
                        <div className="box">
                            <div className="header col-xs-12">
                                <i className="fa fa-comments-o"></i>
                                <span className="box-title">Chat</span>
                            </div>
                            <div id="chat-messages" className="chat-messages col-xs-12">{messages}</div>
                            <form className="chat-form " onSubmit={(e) => this.sendMessage(e)}>
                                <input type="text" id="input-message" className="form-control" placeholder="Type your message here..." />
                                <button type="submit" className="btn " >Send</button>
                            </form>
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

    renderChatLine(userName, portrait, message, displayPortraitLeft, time) {
        let picturePosition = displayPortraitLeft ? 'display-left' : 'display-right';
        let picture = portrait == '' ? <div className="fake-picture"></div> : <img src={portrait} />
        return (
            <div className={'line ' + picturePosition}>
                <div className="portrait">
                    {picture}
                </div>
                <div className="message">
                    <div className="user-info">
                        <span className="user-name">{userName}</span>
                        <span className="time">{time}</span>
                    </div>
                    <p className="user-message">
                        {message}
                    </p>
                </div>
            </div>
        );
    }

    postMessage(msg) {
        return (
            fetch('http://dev.4all.com:3050/messages', {
                method: 'POST',
                body: JSON.stringify({ message: msg }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            }).then(function (response) {

                response.text().then(function (responseText) {
                    console.log(responseText);
                })
            }, function (error) {
                error.message
            })
        )
    }

    sendMessage(e) {
        e.preventDefault();
        let message = document.getElementById('input-message');
        if (message.value != '') {
            this.postMessage(message.value);
            let messages = this.state.data;
            messages.push({
                'userName': 'Eu',
                'portrait': 'https://api.adorable.io/avatars/eyes4/',
                'message': message.value,
                'displayPortraitLeft': true,
                'time': '1 min ago'
            });
            this.setState({ data: messages })
            this.scrollMessageBox();
            message.value = '';
        }

    }

    scrollMessageBox() {
        let objDiv = document.getElementById('chat-messages');
        setTimeout(
            function () {
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 100);
    }
}

module.exports = ChatComponent;