require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Api from '../../sources/api';
import LoaderComponent from '../loader/LoaderComponent';
import ListComponent from '../list/ListComponent';
import ListLineComponent from '../list/ListLineComponent';
import WeaponsSource from './WeaponsSource';

class WeaponsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            mounted: false
        };
    }

    componentDidMount() {
        return (
            WeaponsSource.get()
                .then((responseJson) => {
                   
                    let componentData = {
                        title: "House Ancestral Weapons",
                        iconTitle: "fa-shield",
                        messages: responseJson

                    }
                    console.log(responseJson)
                    this.setState({ data: componentData, mounted: true });
                })
                .catch((error) => {
                    console.error(error);
                })
        )
    }

    render() {
        let content = <LoaderComponent />;

        if (this.state.mounted) {
            content = (
                <ListComponent title={this.state.data.title} iconTitle={this.state.data.iconTitle}>
                    {
                        this.state.data.messages.map(
                            (message, i) => <ListLineComponent
                            key={i}
                            title={message.name}
                            subtitle={message.founded != "" ? "House founded in " + message.founded : "No age info"}
                            text={'"' + message.ancestralWeapons + '"'}
                            ></ListLineComponent>
                        )
                    }
                </ListComponent>
            )
        }
        return (
            content
        );
    }

}

module.exports = WeaponsComponent;