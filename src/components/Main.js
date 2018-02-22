require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import WidgetsComponent from './widgets/WidgetsComponent';
import ChartComponent from './chart/ChartComponent';
import ChatComponent from './chat/ChatComponent';


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

AppComponent.defaultProps = {}

module.exports = AppComponent;

