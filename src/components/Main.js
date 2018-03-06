require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import WidgetsComponent from './widgets/WidgetsComponent';
import ChartComponent from './chart/ChartComponent';
import ChatComponent from './chat/ChatComponent';
import WeaponsComponent from './weapons/WeaponsComponent';
import HeaderComponent from './header/HeaderComponent';

import Api from '../sources/api';


class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        };
    }

    componentDidMount() {

        // let data = Api.getBooks();
        // console.log(data)
        return (
            
            Api.getBooks()
                .then((responseJson) => {
                    this.setState({ data: responseJson, mounted: true });
                })
                .catch((error) => {
                    console.error(error);
                })
            // this.setState({ data: data, mounted: true })
        )
    }

    render() {
        var content = <div className="loader app"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>;
        if (this.state.mounted) {
            content = (
                <div>
                    <div className="row">
                        <HeaderComponent />
                    </div>
                    <div className="row">
                        <WidgetsComponent books={this.state.data} />
                    </div>
                    <div className="row">
                        <ChartComponent books={this.state.data} />
                    </div>
                    <div className="row">
                        <ChatComponent />
                        <WeaponsComponent />
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

