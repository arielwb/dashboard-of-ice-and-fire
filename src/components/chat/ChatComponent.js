require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ChatSource from './ChatSource';
import LoaderComponent from '../loader/LoaderComponent';
import ListComponent from '../list/ListComponent';
import ListLineComponent from '../list/ListLineComponent';

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            mounted: false
        };
    }

    componentDidMount() {
        return (
            ChatSource.get()
                .then((responseJson) => {
                    let data = Array.prototype.concat.apply([], responseJson);

                    let componentData = {
                        title: "House Words",
                        iconTitle: "fa-commenting",
                        messages: data

                    }
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
                            subtitle={"from " + message.region}
                            text={'"' + message.words + '"'}
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

module.exports = ChatComponent;