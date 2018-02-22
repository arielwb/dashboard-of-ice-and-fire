require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import WidgetsSource from './WidgetsSource';
import LoaderComponent from '../loader/LoaderComponent';

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
            WidgetsSource.get()
                .then((responseJson) => {
                    this.setState({ data: responseJson, mounted: true });
                })
                .catch((error) => {
                    console.error(error);
                })
        )
    }

    getPageViews() {
        let pageViews = parseInt(this.state.data.pageViews);
        return pageViews > 999 ? (pageViews / 1000).toFixed(1) + 'k' : pageViews;
    }

    render() {
        let widgetCol = 'col-xs-12 col-md-6 col-lg-3';
        let content = <LoaderComponent />;
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
                            {this.renderWidget('Page Views', this.getPageViews(), 'tachometer')}
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


module.exports = WidgetsComponent;