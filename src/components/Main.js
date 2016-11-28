require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NotifyResize } from 'react-notify-resize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class WidgetsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                newOrders: 0,
                comments: 0,
                newUsers: 0,
                pageViews: 0
            },
            mounted: false
        };
    }

    componentDidMount() {
        return (
            fetch('http://dev.4all.com:3050/widgets')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ data: responseJson, mounted: true });
                })
                .catch((error) => {
                    console.error(error);
                })
        )
    }

    render() {
        var widgetCol = 'col-xs-12 col-md-6 col-lg-3';
        var pageViews = parseInt(this.state.data.pageViews);
        pageViews = pageViews > 999 ? (pageViews / 1000).toFixed(1) + 'k' : pageViews;
        var content = <div className="loader"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>;
        if (this.state.mounted) {
            content = (
                <ReactCSSTransitionGroup
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000} >
                    <div className="widgets-component component">
                        <div className={widgetCol}>
                            {this.renderWidget('New Orders', this.state.data.newOrders, 'shopping-bag')}
                        </div>
                        <div className={widgetCol}>
                            {this.renderWidget('Comments', this.state.data.comments, 'comment')}
                        </div>
                        <div className={widgetCol}>
                            {this.renderWidget('New Users', this.state.data.newUsers, 'user')}
                        </div>
                        <div className={widgetCol}>
                            {this.renderWidget('Page Views', pageViews, 'tachometer')}
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            );
        }
        return (
            <div>
                {content}
            </div>
        )
    }

    renderWidget(text, value, icon) {
        return (
            <div className="widget box">
                <div className={icon + ' icon col-xs-12 col-sm-2  col-lg-4'}>
                    <i className={'fa fa-' + icon}></i>
                </div>
                <div className="data col-xs-12 col-sm-10  col-lg-8">
                    <div className="count">{value}</div>
                    <div className="legend">{text}</div>
                </div>
            </div>
        );
    }
}

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartHeight: 0,
            data: [],
            mounted: false
        };
    }

    componentDidMount() {
        return (
            fetch('http://dev.4all.com:3050/pageViews')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ data: responseJson, mounted: true })
                })
                .catch((error) => {
                    console.error(error);
                })

        )
    }

    resize({ width, height }) {
        setTimeout(() => {
            var chartHeight = width > 752 ? 250 : 150;
            chartHeight = width > 1184 ? 400 : chartHeight;
            this.setState({ 'chartHeight': chartHeight });
        }, 50)
    }

    render() {
        const blue = '#1EA7F8';
        const grey = '#F4F4F4';
        var content = <div className="loader"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>;
        if (this.state.mounted) {
            content = (
                <ReactCSSTransitionGroup
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000} >
                    <div className="chart-component component col-xs-12 " >
                        <NotifyResize onResize={this.resize.bind(this)} notifyOnMount={true} />
                        <div className="box">
                            <div className="header col-xs-12">
                                <span className="box-title">Site Traffic Overview</span>
                            </div>
                            <div className="header col-xs-12">
                                <ResponsiveContainer height={this.state.chartHeight}>
                                    <AreaChart
                                        data={this.state.data}
                                        margin={{ top: 15, right: 15, left: 15, bottom: 15 }}>
                                        <XAxis dataKey="month" fontSize={11} />
                                        <YAxis fontSize={11} tickCount={11} width={15} />
                                        <CartesianGrid stroke={grey} />
                                        <Tooltip labelStyle={{ fontSize: 14 }} itemStyle={{ fontSize: 14 }} />
                                        <Area
                                            type='monotone'
                                            dot={{ fill: blue, stroke: 'white', r: 3, fillOpacity: 1 }}
                                            activeDot={{ r: 5 }}
                                            dataKey='views'
                                            stroke={blue}
                                            fill={blue}
                                            fillOpacity={0.3}
                                            animationEasing='linear' />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
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
}

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
            fetch('http://dev.4all.com:3050/messages')
                .then((response) => response.json())
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
        var messages = this.state.data.map((v, i) => {
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

        var content = <div className="loader"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>;
        if (this.state.mounted) {
            content = (
                <ReactCSSTransitionGroup
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000} >
                    <div className="chat-component component col-xs-12 col-md-8">
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
        var picturePosition = displayPortraitLeft ? 'display-left' : 'display-right';
        var picture = portrait == '' ? <div className="fake-picture"></div> : <img src={portrait} />
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
                response.status
                response.statusText
                response.headers
                response.url
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
        var message = document.getElementById('input-message');
        if (message.value != '') {
            this.postMessage(message.value);
            var messages = this.state.data;
            messages.push({
                'userName': 'Eu',
                'portrait': '',
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
        var objDiv = document.getElementById('chat-messages');
        setTimeout(
            function () {
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 100);
    }
}

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        return (
            this.setState({ mounted: true })
        )
    }

    render() {
        var content = <div className="loader app"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>;
        if (this.state.mounted) {
            content = (
                <div>
                    <div className="row">
                        <h1 className="page-title col-xs-12 ">Dashboard</h1>
                    </div>
                    <div className="row">
                        <WidgetsComponent />
                    </div>
                    <div className="row">
                        <ChartComponent />
                    </div>
                    <div className="row">
                        <ChatComponent />
                    </div>
                </div>
            );
        }

        return (
            <div>{content}</div>
        )
    }
}

AppComponent.defaultProps = {
}


module.exports = AppComponent;

