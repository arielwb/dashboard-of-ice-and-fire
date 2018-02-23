require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoaderComponent from '../loader/LoaderComponent';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            title: "",
            iconTitle: "",
            mounted: false
        };
    }

    componentDidMount() {
        let p = this.props;
        console.log(p)
        return (this.setState({ title: p.title, iconTitle: p.iconTitle, mounted: true }))
    }

    render() {
        console.log(this.state);


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
                                <i className={"fa " + this.state.iconTitle}></i>
                                <span className="box-title">{this.state.title}</span>
                            </div>
                            <div id="chat-messages" className="chat-messages col-xs-12">{this.props.children}</div>

                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            );
        }

        return (
            content
        );
    }


}

module.exports = ListComponent;